import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../../hooks/useFavoritesStore";
import { useThemeStyles } from "../../hooks/useThemeStyles";

function Favorites() {
  const { photos, posts, removePhotoFromFavorites, removePostFromFavorites } =
    useFavoritesStore();
  const styles = useThemeStyles();

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">My Favorites</h1>
        <p className="lead text-secondary">
          Your collection of favorite photos and posts
        </p>
        <div className="d-flex justify-content-center gap-4">
          <div className="text-center">
            <div
              className="mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={styles.iconCircle(60)}
            >
              📸
            </div>
            <h3 className="h4 fw-bold">{photos.length}</h3>
            <p className="small text-muted">Photos</p>
          </div>
          <div className="text-center">
            <div
              className="mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={styles.iconCircle(60)}
            >
              📝
            </div>
            <h3 className="h4 fw-bold">{posts.length}</h3>
            <p className="small text-muted">Posts</p>
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div className="mb-5">
        <h2 className="display-6 fw-bold text-primary mb-4">
          Favorite Photos ({photos.length})
        </h2>
        {photos.length === 0 ? (
          <Card className="text-center py-5 border-0 shadow-sm">
            <Card.Body>
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)",
                  borderRadius: "50%",
                  fontSize: "2rem",
                }}
              >
                📸
              </div>
              <h4 className="text-muted">No favorite photos yet</h4>
              <p className="text-muted">
                Start adding photos to your favorites!
              </p>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {photos.map((photo) => (
              <Col key={photo.id} md={4} lg={3}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{
                    transition: "all 0.3s ease",
                    background:
                      "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                    borderRadius: "15px",
                  }}
                >
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={photo.thumbnailUrl}
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
                        background: "rgba(220, 53, 69, 0.9)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      ❤️
                    </div>
                  </div>
                  <Card.Body className="p-3">
                    <Card.Title className="h6 fw-bold text-dark mb-2">
                      {photo.title}
                    </Card.Title>
                    <p className="text-muted small mb-3">
                      <span className="badge bg-primary me-1">👤</span>
                      Album by:{" "}
                      <Link
                        to={`/users/${photo.userId}`}
                        className="text-decoration-none fw-semibold"
                      >
                        User {photo.userId}
                      </Link>
                    </p>
                    <div className="d-grid gap-2">
                      <Link
                        to={`/users/${photo.userId}/albums/${photo.albumId}`}
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          className="rounded-pill fw-semibold"
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
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removePhotoFromFavorites(photo.id)}
                        className="rounded-pill fw-semibold"
                        style={{ transition: "all 0.3s ease" }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="display-6 fw-bold text-primary mb-4">
          Favorite Posts ({posts.length})
        </h2>
        {posts.length === 0 ? (
          <Card className="text-center py-5 border-0 shadow-sm">
            <Card.Body>
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)",
                  borderRadius: "50%",
                  fontSize: "2rem",
                }}
              >
                📝
              </div>
              <h4 className="text-muted">No favorite posts yet</h4>
              <p className="text-muted">
                Start adding posts to your favorites!
              </p>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {posts.map((post) => (
              <Col key={post.id} md={6}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{
                    transition: "all 0.3s ease",
                    background:
                      "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                    borderRadius: "15px",
                  }}
                >
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start mb-3">
                      <div
                        className="me-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "50%",
                          fontSize: "1.5rem",
                        }}
                      >
                        📝
                      </div>
                      <div className="flex-grow-1">
                        <Card.Title className="h5 fw-bold text-dark mb-2">
                          {post.title}
                        </Card.Title>
                        <p className="text-muted small mb-0">
                          <span className="badge bg-primary me-1">👤</span>
                          Post by:{" "}
                          <Link
                            to={`/users/${post.userId}`}
                            className="text-decoration-none fw-semibold"
                          >
                            User {post.userId}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <Card.Text className="text-muted mb-4">
                      {post.body.length > 150
                        ? `${post.body.substring(0, 150)}...`
                        : post.body}
                    </Card.Text>
                    <div className="d-flex gap-2">
                      <Link to={`/users/${post.userId}/posts/${post.id}`}>
                        <Button
                          variant="primary"
                          size="sm"
                          className="rounded-pill fw-semibold"
                          style={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            border: "none",
                            transition: "all 0.3s ease",
                          }}
                        >
                          👁️ View Post
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removePostFromFavorites(post.id)}
                        className="rounded-pill fw-semibold"
                        style={{ transition: "all 0.3s ease" }}
                      >
                        ❌ Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}

export default Favorites;
