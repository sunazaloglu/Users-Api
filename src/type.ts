//  User Types
export interface UserTypes {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    city: string;
    street: string;
  };
}

//  User Detail Types
export interface UserDetailTypes {
  id: number;
  name: string;
  email: string;
  username: string;
}

//  Post Types
export interface UserPostsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

//  Album Types
export interface UserAlbumsType {
  userId: number;
  id: number;
  title: string;
}

//  Comment Types
export interface UserPostDetailsType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

//  Photo Types
export interface PhotoType {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

//  Album with Photos Type
export interface AlbumWithPhotosType extends UserAlbumsType {
  photos: PhotoType[];
}

//  Favorite Types
export interface FavoritePhotoType {
  userId: number;
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface FavoritePostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

//  Favorites Store Type
export interface FavoritesStoreType {
  photos: FavoritePhotoType[];
  posts: FavoritePostType[];
  addPhotoToFavorites: (
    photo: PhotoType,
    userId: number,
    albumId: number
  ) => void;
  removePhotoFromFavorites: (photoId: number) => void;
  addPostToFavorites: (post: UserPostsType, userId: number) => void;
  removePostFromFavorites: (postId: number) => void;
  isPhotoFavorited: (photoId: number) => boolean;
  isPostFavorited: (postId: number) => boolean;
}
