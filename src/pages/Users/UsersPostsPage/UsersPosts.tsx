import { Link, useLoaderData } from "react-router-dom";
import type { UserPostsType } from "../../../type";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useFavoritesStore } from "../../../hooks/useFavoritesStore";

function UsersPosts() {
  const posts = useLoaderData() as UserPostsType[];
  const { addPostToFavorites, removePostFromFavorites, isPostFavorited } = useFavoritesStore();
  const userId = posts.length > 0 ? posts[0].userId : 0;

  const handleToggleFavorite = (post: UserPostsType) => {
    if (isPostFavorited(post.id)) {
      removePostFromFavorites(post.id);
    } else {
      addPostToFavorites(post, userId);
    }
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="display-6 fw-bold text-primary mb-2">
          Posts
        </h2>
        <p className="text-muted">Explore all posts by this user</p>
      </div>
      
      <Row className="g-4">
        {posts.map((post) => (
          <Col key={post.id} md={6} lg={4}>
            <Card 
              className="h-100 border-0 shadow-sm"
              style={{
                transition: "all 0.3s ease",
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                borderRadius: "15px"
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-start mb-3">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "50%",
                      fontSize: "1.2rem",
                      padding:10
                    }}
                  >
                    📝
                  </div>
                  <div className="flex-grow-1">
                    <Card.Title className="h6 fw-bold text-dark mb-2">
                      {post.title}
                    </Card.Title>
                  </div>
                </div>
                
                <Card.Text className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                  {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
                </Card.Text>
                
                <div className="d-grid gap-2">
                  <Link to={`/users/${userId}/posts/${post.id}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="rounded-pill fw-semibold"
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        transition: "all 0.3s ease"
                      }}
                    >
                       View Post
                    </Button>
                  </Link>
                  <Button
                    variant={isPostFavorited(post.id) ? "danger" : "outline-danger"}
                    size="sm"
                    onClick={() => handleToggleFavorite(post)}
                    className="rounded-pill fw-semibold"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {isPostFavorited(post.id) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UsersPosts;
