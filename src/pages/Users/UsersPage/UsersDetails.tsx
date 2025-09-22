import {
  Link,
  Outlet,
  useLoaderData,
  useParams,
  useLocation,
} from "react-router-dom";
import type { UserDetailTypes } from "../../../type";
import { Nav, Card, Container } from "react-bootstrap";

function UsersDetails() {
  const userDetailRoutes = [
    {
      route: "posts",
      name: "Posts",
    },
    {
      route: "albums",
      name: "Albums",
    },
    {
      route: "todos",
      name: "Todos",
    },
  ];
  const userDetail = useLoaderData() as UserDetailTypes;
  const { userId } = useParams();
  const location = useLocation();

  //dinamik url nde ne varsa onu key value degeri olarak sana donuyor
  //   {
  //     userId: 1,
  //     key: 35,
  //     userName: "su"
  //     http://localhost:5174/users/1/35/su
  // path: "users/:userId/:key/:userName",
  //   }

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/posts")) return "posts";
    if (path.includes("/albums")) return "albums";
    if (path.includes("/todos")) return "todos";
    return undefined; // hiçbir tab seçili olmasın
  };

  return (
    <Container className="py-4">
      <Card
        className="mb-4 border-0 shadow-lg"
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
                  width: "100px",
                  height: "100px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  fontSize: "3rem",
                }}
              >
                👤
              </div>
            </div>
            <div className="col">
              <h1 className="display-5 fw-bold text-primary mb-2">
                {userDetail.name}
              </h1>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-2">
                    <span className="badge bg-primary me-2">👤</span>
                    <strong>Username:</strong> {userDetail.username}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <span className="badge bg-success me-2">📧</span>
                    <strong>Email:</strong> {userDetail.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Nav
            variant="pills"
            activeKey={getActiveTab()}
            className="px-4 pt-3"
            style={{ borderBottom: "1px solid #e9ecef" }}
          >
            {userDetailRoutes.map((routeLink) => (
              <Nav.Item key={routeLink.route} className="me-2">
                <Nav.Link
                  as={Link}
                  to={`/users/${userId}/${routeLink.route}`}
                  eventKey={routeLink.route}
                  className="fw-semibold px-4 py-3"
                  style={{
                    borderRadius: "10px 10px 0 0",
                    transition: "all 0.3s ease",
                  }}
                >
                  {routeLink.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <div className="p-4">
            <Outlet />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UsersDetails;
