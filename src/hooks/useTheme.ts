import { useContext } from "react";
import {
  ThemeContext,
  type ThemeContextType,
} from "../contexts/ThemeContextDefinition.tsx";

//  Theme state ve fonksiyonlarına erişim sağlar.
//  Provider dışında kullanılırsa hata fırlatır.

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
