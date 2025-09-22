import { useContext } from "react";
import type { FavoritesStoreType } from "../type";
import { FavoritesContext } from "../contexts/FavoritesContext";

// Favorites store'a erişim sağlar.
// Provider dışında kullanılırsa hata fırlatır.
export const useFavoritesStore = (): FavoritesStoreType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritesStore must be used within a FavoritesProvider"
    );
  }
  return context;
};
