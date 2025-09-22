import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Card, Row, Col, Badge } from "react-bootstrap";

export interface TodoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function UsersTodos() {
  const [loading, setLoading] = useState<boolean>(false);
  const todos = useLoaderData() as TodoType[];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" />
      </div>
    );
  }

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="display-6 fw-bold text-primary mb-2">Todos</h2>
        <p className="text-muted">Track tasks and accomplishments</p>
        <div className="d-flex justify-content-center gap-3">
          <Badge
            bg="success"
            className="px-3 py-2 fs-6"
            style={{ borderRadius: "20px" }}
          >
            Completed: {completedTodos.length}
          </Badge>
          <Badge
            bg="warning"
            className="px-3 py-2 fs-6"
            style={{ borderRadius: "20px" }}
          >
            Pending: {pendingTodos.length}
          </Badge>
        </div>
      </div>

      <Row className="g-4">
        {todos.map((todo) => (
          <Col key={todo.id} md={6} lg={4}>
            <Card
              className={`h-100 border-0 shadow-sm ${
                todo.completed ? "border-success" : "border-warning"
              }`}
              style={{
                transition: "all 0.3s ease",
                background: todo.completed
                  ? "linear-gradient(145deg, #d4edda 0%, #c3e6cb 100%)"
                  : "linear-gradient(145deg, #fff3cd 0%, #ffeaa7 100%)",
                borderRadius: "15px",
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    {todo.completed ? (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          background:
                            "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                          borderRadius: "50%",
                          fontSize: "1.5rem",
                        }}
                      >
                        ✅
                      </div>
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          background:
                            "linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)",
                          borderRadius: "50%",
                          fontSize: "1.5rem",
                        }}
                      >
                        ⏳
                      </div>
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <Card.Title
                      className={`h6 fw-bold mb-3 ${
                        todo.completed
                          ? "text-decoration-line-through text-muted"
                          : "text-dark"
                      }`}
                    >
                      {todo.title}
                    </Card.Title>
                    <Badge
                      bg={todo.completed ? "success" : "warning"}
                      className="px-3 py-2"
                      style={{ borderRadius: "15px" }}
                    >
                      {todo.completed ? "Completed" : " Pending"}
                    </Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UsersTodos;
