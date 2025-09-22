import { useLoaderData, Link } from "react-router-dom";
import type { UserAlbumsType, PhotoType, UserDetailTypes } from "../../../type";
import { useEffect, useState } from "react";
import { Spinner, Card, Button, Row, Col, Container } from "react-bootstrap";
import { useFavoritesStore } from "../../../hooks/useFavoritesStore";

function UsersAlbumDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const { album, photos, user } = useLoaderData() as {
    album: UserAlbumsType;
    photos: PhotoType[];
    user: UserDetailTypes;
  };

  const { addPhotoToFavorites, removePhotoFromFavorites, isPhotoFavorited } =
    useFavoritesStore();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleFavorite = (photo: PhotoType) => {
    if (isPhotoFavorited(photo.id)) {
      removePhotoFromFavorites(photo.id);
    } else {
      addPhotoToFavorites(photo, user.id, album.id);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      {/* Album Header */}
      <Card
        className="mb-5 border-0 shadow-lg"
        style={{
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "20px",
        }}
      >
        <Card.Body className="p-4">
          <div className="row align-items-center">
            <div className="col-auto">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  fontSize: "2.5rem",
                  padding: 10,
                  justifyContent: "center",
                }}
              >
                📸
              </div>
            </div>
            <div className="col">
              <h1 className="display-5 fw-bold text-primary mb-2">
                {album.title}
              </h1>
              <p className="text-muted mb-0">
                <span className="badge bg-primary me-2">👤</span>
                Album by:{" "}
                <Link
                  to={`/users/${user.id}`}
                  className="text-decoration-none fw-semibold"
                >
                  {user.username}
                </Link>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Photos Grid */}
      <div className="text-center mb-4">
        <h2 className="display-6 fw-bold text-primary mb-2">
          Photos ({photos.length})
        </h2>
        <p className="text-muted">
          Click the heart to add photos to your favorites
        </p>
      </div>

      <Row className="g-4">
        {photos.map((photo) => (
          <Col key={photo.id} md={4} lg={3}>
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                transition: "all 0.3s ease",
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                borderRadius: "15px",
              }}
            >
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={photo.thumbnailUrl}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    // Try the full-size URL first, then a neutral placeholder
                    if (img.src !== photo.url) {
                      img.src = photo.url;
                    } else {
                      img.src = `https://picsum.photos/seed/${photo.id}/400/300`;
                    }
                  }}
                  alt={photo.title}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "15px 15px 0 0",
                  }}
                />
                <div
                  className="position-absolute top-0 end-0 m-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {isPhotoFavorited(photo.id) ? "❤️" : "🤍"}
                </div>
              </div>
              <Card.Body className="p-3">
                <Card.Title className="h6 fw-bold text-dark mb-3">
                  {photo.title}
                </Card.Title>
                <Button
                  variant={
                    isPhotoFavorited(photo.id) ? "danger" : "outline-danger"
                  }
                  size="sm"
                  onClick={() => handleToggleFavorite(photo)}
                  className="w-100 rounded-pill fw-semibold"
                  style={{ transition: "all 0.3s ease" }}
                >
                  {isPhotoFavorited(photo.id)
                    ? "❤️ Remove from Favorites"
                    : "🤍 Add to Favorites"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default UsersAlbumDetails;
