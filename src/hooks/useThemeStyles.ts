// Bu hook uygulama genelinde kullanılan ortak stilleri
// merkezi olarak yönetir. CSS custom properties ile
// tema uyumluluğu sağlar.

export const useThemeStyles = () => {
  return {
    //  Primary gradient style
    gradientPrimary: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
    },

    //  Icon circle generator function
    iconCircle: (size: number) => ({
      width: `${size}px`,
      height: `${size}px`,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: `${size * 0.3}px`,
    }),

    //  Text color styles (theme-aware)
    textPrimary: { color: "#212529" },
    textSecondary: { color: "#6c757d" },
    textMuted: { color: "#6c757d" },

    //  Dark theme text colors
    textPrimaryDark: { color: "#ffffff" },
    textSecondaryDark: { color: "#e0e0e0" },
    textMutedDark: { color: "#b3b3b3" },
  };
};
