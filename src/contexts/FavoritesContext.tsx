import { createContext } from "react";
import type { FavoritesStoreType } from "../type";

export const FavoritesContext = createContext<FavoritesStoreType | undefined>(
  undefined
);
