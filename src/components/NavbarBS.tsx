// Uygulamanın ana navigasyon çubuğu. Tüm sayfalarda görünür
// ve kullanıcıların farklı bölümler arasında gezinmesini sağlar.

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../hooks/useFavoritesStore";
import { Badge, Button } from "react-bootstrap";
import { useTheme } from "../hooks/useTheme";

function NavbarBS() {
  const { photos, posts } = useFavoritesStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar
      expand="lg"
      className="shadow-sm"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderBottom: "3px solid #5a67d8",
      }}
    >
      <Container>
        <Navbar.Brand
          className="text-white fw-bold fs-3"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        >
          Users API
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ borderColor: "white" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="text-white fw-semibold px-3 py-2 rounded me-2 nav-link-custom"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/users"
              className="text-white fw-semibold px-3 py-2 rounded me-2 nav-link-custom"
            >
              Users
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favorites"
              className="text-white fw-semibold px-3 py-2 rounded position-relative me-2 nav-link-custom"
            >
              Favorites
              <Badge
                bg="info"
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.7rem" }}
              >
                {photos.length + posts.length}
              </Badge>
            </Nav.Link>
          </Nav>
          <Nav>
            <Button
              variant="outline-light"
              onClick={toggleTheme}
              className="rounded-pill px-3 py-2"
              style={{
                transition: "all 0.3s ease",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {theme === "light" ? "🌙" : "☀️"}{" "}
              {theme === "light" ? "Dark" : "Light"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBS;
