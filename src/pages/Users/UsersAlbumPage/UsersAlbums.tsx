import { Link, useLoaderData } from "react-router-dom";
import type { UserAlbumsType } from "../../../type";
import { useEffect, useState } from "react";
import { Spinner, Row, Col, Card, Button } from "react-bootstrap";

function UsersAlbums() {
  const [loading, setLoading] = useState<boolean>(false);
  const albums = useLoaderData() as UserAlbumsType[];
  const [albumCovers, setAlbumCovers] = useState<Record<number, string>>({});

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch first photo of each album as cover (client-side to avoid many loader requests)
  useEffect(() => {
    let isCancelled = false;
    const loadCovers = async () => {
      try {
        const requests = albums.map((album) =>
          fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}&_limit=1`
          )
            .then((r) => r.json())
            .then((arr) => ({
              albumId: album.id,
              url: arr?.[0]?.thumbnailUrl || arr?.[0]?.url,
            }))
            .catch(() => ({
              albumId: album.id,
              url: undefined as unknown as string,
            }))
        );
        const results = await Promise.all(requests);
        if (isCancelled) return;
        const map: Record<number, string> = {};
        results.forEach(({ albumId, url }) => {
          if (url) map[albumId] = url;
        });
        setAlbumCovers(map);
      } catch (error) {
        // Fallback: leave map empty on error
        console.error("Failed to load album covers", error);
      }
    };
    if (albums?.length) {
      loadCovers();
    }
    return () => {
      isCancelled = true;
    };
  }, [albums]);

  if (loading) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="display-6 fw-bold text-primary mb-2">Albums</h2>
        <p className="text-muted">Browse through photo albums</p>
      </div>

      <Row className="g-4">
        {albums.map((album) => (
          <Col key={album.id} md={6} lg={4}>
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                transition: "all 0.3s ease",
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                borderRadius: "15px",
              }}
            >
              {albumCovers[album.id] && (
                <Card.Img
                  variant="top"
                  src={albumCovers[album.id]}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.src = `https://picsum.photos/seed/album-${album.id}/400/200`;
                  }}
                  alt={album.title}
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "15px 15px 0 0",
                  }}
                />
              )}
              <Card.Body className="p-4 text-center">
                <div
                  className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "50%",
                    fontSize: "1.5rem",
                  }}
                >
                  📸
                </div>
                <Card.Title className="h6 fw-bold text-dark mb-3">
                  {album.title}
                </Card.Title>
                <Link to={`/users/${album.userId}/albums/${album.id}`}>
                  <Button
                    variant="primary"
                    className="w-100 rounded-pill fw-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    View Album
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UsersAlbums;
