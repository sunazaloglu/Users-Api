import { Link, useLoaderData } from "react-router-dom";
import type { UserTypes } from "../../../type";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Dropdown,
  Pagination,
} from "react-bootstrap";
import {
  UserCardSkeleton,
  SkeletonStyles,
} from "../../../components/SkeletonLoader";
import { useState, useEffect } from "react";
import { useThemeStyles } from "../../../hooks/useThemeStyles";


function Users() {
  const users = useLoaderData() as UserTypes[];
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [cityFilter, setCityFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const styles = useThemeStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Debounce effect - 800ms bekleyip arama yap
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  // Arama, filtreleme ve sıralama fonksiyonları
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
      const matchesCity =
        cityFilter === "" ||
        user.address.city.toLowerCase().includes(cityFilter.toLowerCase());
      const matchesCompany =
        companyFilter === "" ||
        user.company.name.toLowerCase().includes(companyFilter.toLowerCase());

      return matchesSearch && matchesCity && matchesCompany;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Sayfa değiştiğinde scroll'u yukarı al
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <Container className="py-4 container-mobile">
      <SkeletonStyles />
      <div className="text-center mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="display-4 fw-bold mb-0" style={{ color: "#667eea" }}>Our Users</h1>
          <Button
            variant="outline-primary"
            onClick={() => window.location.reload()}
            className="d-flex align-items-center gap-2"
          >
            🔄 Refresh
          </Button>
        </div>
        <p className="lead text-muted mb-4">
          Discover amazing people and explore their content
        </p>

        {/* Arama, Filtreler ve Sıralama */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-10">
            <div className="row g-3">
              {/* Arama Kutusu */}
              <div className="col-md-6 col-12">
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder=" Search users by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-center search-box"
                  />
                  {isSearching && (
                    <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                      <div
                        className="spinner-border spinner-border-sm text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Searching...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Şehir Filtresi */}
              <div className="col-md-2 col-6">
                <Form.Control
                  type="text"
                  placeholder="Filter by city..."
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="text-center"
                />
              </div>

              {/* Şirket Filtresi */}
              <div className="col-md-2 col-6">
                <Form.Control
                  type="text"
                  placeholder="Filter by company..."
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="text-center"
                />
              </div>

              {/* Sıralama Dropdown */}
              <div className="col-md-2 col-12">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    className="w-100 sort-dropdown"
                    style={{
                      ...styles.gradientPrimary,
                      color: "white",
                      border: "none",
                    }}
                  >
                    📊 Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => setSortOrder("asc")}
                      active={sortOrder === "asc"}
                    >
                      🔤 A-Z (Ascending)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setSortOrder("desc")}
                      active={sortOrder === "desc"}
                    >
                      🔤 Z-A (Descending)
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row className="g-4">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 8 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))
        ) : currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <Col key={user.id} md={6} lg={4} xl={3} className="user-card">
              <Card className="h-100 shadow-sm border-0 fade-in user-card-desktop">
                <Card.Body className="text-center p-4">
                  <div
                    className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={styles.iconCircle(80)}
                  >
                    👤
                  </div>
                  <Card.Title className="h5 fw-bold mb-2">
                    {user.name}
                  </Card.Title>

                  {/* Ek Bilgiler */}
                  <div className="mb-3">
                    <p className="small text-muted mb-1">📧 {user.email}</p>
                    <p className="small text-muted mb-1">
                      🏢 {user.company.name}
                    </p>
                    <p className="small text-muted mb-1">
                      📍 {user.address.city}
                    </p>
                  </div>

                  <Link to={`/users/${user.id}`}>
                    <Button
                      variant="primary"
                      className="w-100 rounded-pill fw-semibold btn-mobile"
                      style={styles.gradientPrimary}
                    >
                      View Profile
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <div className="py-5">
              <h3 className="text-muted">😔 No users found</h3>
              <p className="text-muted">Try searching with a different name</p>
            </div>
          </Col>
        )}
      </Row>

      {/* Sayfalama */}
      {!loading && filteredUsers.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
                style={page === currentPage ? styles.gradientPrimary : {}}
              >
                {page}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* Sayfa bilgisi */}
      {!loading && filteredUsers.length > 0 && (
        <div className="text-center mt-3">
          <small className="text-muted">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)}{" "}
            of {filteredUsers.length} users
          </small>
        </div>
      )}
    </Container>
  );
}

export default Users;
