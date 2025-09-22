import { useLoaderData } from "react-router-dom";
import type { UserPostDetailsType, UserPostsType } from "../../../type";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";

function UsersPostDetails() {
  const { post, comments } = useLoaderData() as {
    post: UserPostsType;
    comments: UserPostDetailsType[];
  };

  return (
    <Container className="py-4">
      {/* Post Header */}
      <Card
        className="mb-4 border-0 shadow-lg"
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "50%",
                fontSize: "1.5rem",
                padding: 10,
              }}
            >
              📝
            </div>
            <div className="flex-grow-1">
              <h1 className="display-5 fw-bold text-primary mb-3">
                {post.title}
              </h1>
              <p className="lead text-muted mb-0">{post.body}</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Comments Section */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <div className="p-4 border-bottom">
            <h2 className="display-6 fw-bold text-primary mb-2">
              Comments ({comments.length})
            </h2>
            <p className="text-muted">What people are saying about this post</p>
          </div>

          <div className="p-4">
            {comments.length === 0 ? (
              <div className="text-center py-5">
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
                  💬
                </div>
                <h4 className="text-muted">No comments yet</h4>
                <p className="text-muted">
                  Be the first to comment on this post!
                </p>
              </div>
            ) : (
              <Row className="g-4">
                {comments.map((comment) => (
                  <Col key={comment.id} md={6}>
                    <Card
                      className="h-100 border-0 shadow-sm"
                      style={{
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
                              width: "40px",
                              height: "40px",
                              background:
                                "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                              borderRadius: "50%",
                              fontSize: "1rem",
                              padding: 10,
                            }}
                          >
                            👤
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="fw-bold text-dark mb-1">
                              {comment.name}
                            </h6>
                            <p className="text-muted small mb-2">
                              <Badge bg="primary" className="me-1">
                                📧
                              </Badge>
                              {comment.email}
                            </p>
                          </div>
                        </div>
                        <p className="text-muted mb-0">{comment.body}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UsersPostDetails;
