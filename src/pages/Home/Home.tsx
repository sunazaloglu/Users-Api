import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../../hooks/useFavoritesStore";

function Home() {
  const { photos, posts } = useFavoritesStore();

  return (
    <Container className="py-5">
      {/* herosection */}
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold mb-4" style={{ color: "#667eea" }}>
          Welcome to Users API
        </h1>
        <p className="lead mb-4" style={{ color: "#667eea" }}>
          Discover amazing people, explore their content, and build your
          personal favorites collection
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/users">
            <Button
              variant="primary"
              size="lg"
              className="rounded-pill px-4 py-3 fw-semibold"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                transition: "all 0.3s ease",
              }}
            >
              Explore Users
            </Button>
          </Link>
          <Link to="/favorites">
            <Button
              variant="outline-primary"
              size="lg"
              className="rounded-pill px-4 py-3 fw-semibold"
              style={{ transition: "all 0.3s ease" }}
            >
              My Favorites
            </Button>
          </Link>
        </div>
      </div>

      {/*  starts section */}
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card
            className="h-100 border-0 shadow-sm text-center"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  fontSize: "2rem",
                }}
              >
                👥
              </div>
              <h3 className="h2 fw-bold text-primary mb-2">10</h3>
              <p className="text-muted mb-0">Active Users</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="h-100 border-0 shadow-sm text-center"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%,rgb(76, 90, 219) 100%)",
                  borderRadius: "50%",
                  fontSize: "2rem",
                }}
              >
                📸
              </div>
              <h3 className="h2 fw-bold mb-2" style={{ color: "#8b5cf6" }}>
                {photos.length}
              </h3>
              <p className="text-muted mb-0">Favorite Photos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="h-100 border-0 shadow-sm text-center"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg,rgb(64, 114, 250) 0%,rgb(89, 20, 153) 100%)",
                  borderRadius: "50%",
                  fontSize: "2rem",
                  padding: 10,
                  margin: 5,
                }}
              >
                📝
              </div>
              <h3 className="h2 fw-bold mb-2" style={{ color: "#7c3aed" }}>
                {posts.length}
              </h3>
              <p className="text-muted mb-0">Favorite Posts</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card
            className="h-100 border-0 shadow-sm"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-4">
              <div className="d-flex align-items-start">
                <div
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "50%",
                    fontSize: "1.5rem",
                    padding: 10,
                    margin: 5,
                  }}
                >
                  🔍
                </div>
                <div>
                  <h4 className="fw-bold text-dark mb-2">Explore Content</h4>
                  <p className="text-muted mb-3">
                    Browse through user profiles, posts, albums, and todos.
                    Discover interesting content from our community.
                  </p>
                  <Link to="/users">
                    <Button
                      variant="primary"
                      className="rounded-pill"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                      }}
                    >
                      Start Exploring
                    </Button>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card
            className="h-100 border-0 shadow-sm"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-4">
              <div className="d-flex align-items-start">
                <div
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    background:
                      "linear-gradient(135deg, rgb(64, 114, 250) 0%, #9333ea 100%)",
                    borderRadius: "50%",
                    fontSize: "1.5rem",
                    padding: 10,
                    margin: 5,
                  }}
                >
                  ❤️
                </div>
                <div>
                  <h4 className="fw-bold text-dark mb-2">Save Favorites</h4>
                  <p className="text-muted mb-3">
                    Add photos and posts to your personal favorites collection.
                    Your favorites are saved locally and persist between
                    sessions.
                  </p>
                  <Link to="/favorites">
                    <Button
                      variant="success"
                      className="rounded-pill"
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(64, 114, 250) 0%, #9333ea 100%)",
                        border: "none",
                      }}
                    >
                      View Favorites
                    </Button>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
