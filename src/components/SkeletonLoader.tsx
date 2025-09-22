import { Card, Col } from "react-bootstrap";

export const UserCardSkeleton = () => (
  <Col md={6} lg={4} xl={3} className="mb-3">
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="text-center p-4">
        <div
          className="mx-auto mb-3 skeleton"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
          }}
        />
        <div
          className="skeleton mb-3"
          style={{ height: "24px", borderRadius: "4px" }}
        />
        <div
          className="skeleton"
          style={{ height: "40px", borderRadius: "20px" }}
        />
      </Card.Body>
    </Card>
  </Col>
);

export const PostCardSkeleton = () => (
  <Col md={6} lg={4} className="mb-3">
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex align-items-start mb-3">
          <div
            className="me-3 skeleton"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <div className="flex-grow-1">
            <div
              className="skeleton mb-2"
              style={{ height: "20px", borderRadius: "4px" }}
            />
          </div>
        </div>
        <div
          className="skeleton mb-4"
          style={{ height: "60px", borderRadius: "4px" }}
        />
        <div className="d-grid gap-2">
          <div
            className="skeleton"
            style={{ height: "32px", borderRadius: "16px" }}
          />
          <div
            className="skeleton"
            style={{ height: "32px", borderRadius: "16px" }}
          />
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export const CommentCardSkeleton = () => (
  <Col md={6} className="mb-3">
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex align-items-start mb-3">
          <div
            className="me-3 skeleton"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <div className="flex-grow-1">
            <div
              className="skeleton mb-1"
              style={{ height: "16px", borderRadius: "4px" }}
            />
            <div
              className="skeleton mb-2"
              style={{ height: "14px", borderRadius: "4px" }}
            />
          </div>
        </div>
        <div
          className="skeleton"
          style={{ height: "40px", borderRadius: "4px" }}
        />
      </Card.Body>
    </Card>
  </Col>
);

export const PhotoCardSkeleton = () => (
  <Col md={4} lg={3} className="mb-3">
    <Card className="h-100 border-0 shadow-sm">
      <div
        className="skeleton"
        style={{
          height: "200px",
          borderRadius: "15px 15px 0 0",
        }}
      />
      <Card.Body className="p-3">
        <div
          className="skeleton mb-2"
          style={{ height: "16px", borderRadius: "4px" }}
        />
        <div
          className="skeleton"
          style={{ height: "32px", borderRadius: "16px" }}
        />
      </Card.Body>
    </Card>
  </Col>
);

// CSS for skeleton animation
export const SkeletonStyles = () => (
  <style>
    {`
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `}
  </style>
);
