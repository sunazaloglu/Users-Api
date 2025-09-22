// Bu dosya favori fotoğraf ve post'ları için global state yönetimi sağlar.
// React Context API kullanılarak tüm uygulama boyunca state paylaşımı yapılır.
// LocalStorage ile veri kalıcılığı sağlanır.

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  FavoritesStoreType,
  FavoritePhotoType,
  FavoritePostType,
  PhotoType,
  UserPostsType,
} from "../type";
import { useToast } from "../hooks/useToast";
import { FavoritesContext } from "../contexts/FavoritesContext";

//  Favorites Provider Component

//  Context Provider component'i. Tüm state yönetimi ve
//  LocalStorage işlemleri burada gerçekleştirilir.

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  //  Favori fotoğraflar state'i
  const [photos, setPhotos] = useState<FavoritePhotoType[]>([]);
  //  Favori post'lar state'i
  const [posts, setPosts] = useState<FavoritePostType[]>([]);
  //  Toast notification hook'u
  const { showToast } = useToast();

  // LocalStorage'dan verileri yükle
  useEffect(() => {
    const savedPhotos = localStorage.getItem("favoritePhotos");
    const savedPosts = localStorage.getItem("favoritePosts");

    if (savedPhotos) {
      try {
        setPhotos(JSON.parse(savedPhotos));
      } catch (error) {
        console.error("Error loading favorite photos:", error);
      }
    }

    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error("Error loading favorite posts:", error);
      }
    }
  }, []);

  // Photos için functions
  const addPhotoToFavorites = (
    photo: PhotoType,
    userId: number,
    albumId: number
  ) => {
    const favoritePhoto: FavoritePhotoType = {
      userId,
      albumId,
      id: photo.id,
      title: photo.title,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl,
    };

    setPhotos((prev) => {
      const newPhotos = [...prev, favoritePhoto];
      localStorage.setItem("favoritePhotos", JSON.stringify(newPhotos));
      showToast({
        type: "success",
        title: "Photo Added!",
        message: "Photo has been added to your favorites",
        duration: 3000,
      });
      return newPhotos;
    });
  };

  const removePhotoFromFavorites = (photoId: number) => {
    setPhotos((prev) => {
      const newPhotos = prev.filter((photo) => photo.id !== photoId);
      localStorage.setItem("favoritePhotos", JSON.stringify(newPhotos));
      showToast({
        type: "info",
        title: "Photo Removed",
        message: "Photo has been removed from your favorites",
        duration: 3000,
      });
      return newPhotos;
    });
  };

  // Posts için functions
  const addPostToFavorites = (post: UserPostsType, userId: number) => {
    const favoritePost: FavoritePostType = {
      userId,
      id: post.id,
      title: post.title,
      body: post.body,
    };

    setPosts((prev) => {
      const newPosts = [...prev, favoritePost];
      localStorage.setItem("favoritePosts", JSON.stringify(newPosts));
      showToast({
        type: "success",
        title: "Post Added!",
        message: "Post has been added to your favorites",
        duration: 3000,
      });
      return newPosts;
    });
  };

  const removePostFromFavorites = (postId: number) => {
    setPosts((prev) => {
      const newPosts = prev.filter((post) => post.id !== postId);
      localStorage.setItem("favoritePosts", JSON.stringify(newPosts));
      showToast({
        type: "info",
        title: "Post Removed",
        message: "Post has been removed from your favorites",
        duration: 3000,
      });
      return newPosts;
    });
  };

  // Check functions
  const isPhotoFavorited = (photoId: number): boolean => {
    return photos.some((photo) => photo.id === photoId);
  };

  const isPostFavorited = (postId: number): boolean => {
    return posts.some((post) => post.id === postId);
  };

  const value: FavoritesStoreType = {
    photos,
    posts,
    addPhotoToFavorites,
    removePhotoFromFavorites,
    addPostToFavorites,
    removePostFromFavorites,
    isPhotoFavorited,
    isPostFavorited,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
