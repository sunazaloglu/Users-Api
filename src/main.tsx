/**
 * 🚀 Users API - React Application Entry Point
 *
 * Bu dosya React uygulamasının ana giriş noktasıdır.
 * Tüm global context provider'ları burada tanımlanır ve
 * uygulama ağacı oluşturulur.
 *
 * @author Your Name
 * @version 1.0.0
 */

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";
import { router } from "./Route";
import { FavoritesProvider } from "./stores/stores";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastProvider } from "./components/ToastNotification";
import { ThemeProvider } from "./contexts/ThemeContext";

// Provider Hierarchy (Yukarıdan aşağıya):
// 1. ErrorBoundary - Hata yakalama ve fallback UI
// 2. ThemeProvider - Dark/Light mode yönetimi
// 3. ToastProvider - Bildirim sistemi
// 4. FavoritesProvider - Favori içerik yönetimi
// 5. RouterProvider - Sayfa yönlendirme sistemi

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  </ErrorBoundary>
);
