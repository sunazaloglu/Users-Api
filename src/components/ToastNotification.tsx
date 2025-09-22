import { useState, type ReactNode } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ToastContext, type ToastMessage } from "../contexts/ToastContext";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      hideToast(id);
    }, newToast.duration);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer
        position="top-center"
        className="p-3"
        style={{
          zIndex: 1055,
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "auto",
          maxWidth: "400px",
        }}
      >
        <style>
          {`
            @keyframes slideInDown {
              from {
                transform: translateY(-100%);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}
        </style>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            show={true}
            onClose={() => hideToast(toast.id)}
            delay={toast.duration}
            autohide
            className="mb-3"
            style={{
              background: getToastBackground(toast.type),
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
              minWidth: "300px",
              maxWidth: "400px",
              animation: "slideInDown 0.3s ease-out",
            }}
          >
            <Toast.Header
              closeButton={true}
              style={{
                background: "transparent",
                border: "none",
                color: getToastTextColor(toast.type),
              }}
            >
              <div
                className="me-2"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: getToastIconBackground(toast.type),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                {getToastIcon(toast.type)}
              </div>
              <strong className="me-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body style={{ color: getToastTextColor(toast.type) }}>
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

// Helper mappings
const TOAST_BACKGROUND: Record<ToastMessage["type"], string> = {
  success: "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
  error: "linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)",
  warning: "linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)",
  info: "linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%)",
};

const TOAST_TEXT_COLOR: Record<ToastMessage["type"], string> = {
  success: "#155724",
  error: "#721c24",
  warning: "#856404",
  info: "#0c5460",
};

const TOAST_ICON_BACKGROUND: Record<ToastMessage["type"], string> = {
  success: "#28a745",
  error: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
};

const TOAST_ICON: Record<ToastMessage["type"], string> = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

const DEFAULT_BACKGROUND = "linear-gradient(135deg, #e2e3e5 0%, #d6d8db 100%)";
const DEFAULT_TEXT_COLOR = "#383d41";
const DEFAULT_ICON_BACKGROUND = "#6c757d";
const DEFAULT_ICON = "📢";

const getToastBackground = (type: ToastMessage["type"]) =>
  TOAST_BACKGROUND[type] ?? DEFAULT_BACKGROUND;

const getToastTextColor = (type: ToastMessage["type"]) =>
  TOAST_TEXT_COLOR[type] ?? DEFAULT_TEXT_COLOR;

const getToastIconBackground = (type: ToastMessage["type"]) =>
  TOAST_ICON_BACKGROUND[type] ?? DEFAULT_ICON_BACKGROUND;

const getToastIcon = (type: ToastMessage["type"]) =>
  TOAST_ICON[type] ?? DEFAULT_ICON;
