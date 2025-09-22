import { createBrowserRouter, type RouteObject } from "react-router-dom";
import RootLayout from "./pages/root";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/UsersPage/Users";
import { usersLoader } from "./pages/Users/UsersPage/users.loader";
import Favorites from "./pages/Favorites/Favorites";
import UsersDetails from "./pages/Users/UsersPage/UsersDetails";
import { userDetailLoader } from "./pages/Users/UsersPage/usersDetails.loader";
import UsersPosts from "./pages/Users/UsersPostsPage/UsersPosts";
import { userPostsLoader } from "./pages/Users/UsersPostsPage/usersPosts.loader";
import UsersPostDetails from "./pages/Users/UsersPostsPage/UsersPostDetails";
import { userPostsCommentsLoader } from "./pages/Users/UsersPostsPage/usersPostDetails.loader";
import UsersAlbums from "./pages/Users/UsersAlbumPage/UsersAlbums";
import { userAlbumsLoader } from "./pages/Users/UsersAlbumPage/usersAlbums.loader";
import UsersAlbumDetails from "./pages/Users/UsersAlbumPage/UsersAlbumDetails";
import { userAlbumDetailsLoader } from "./pages/Users/UsersAlbumPage/usersAlbumDetails.loader";
import UsersTodos from "./pages/Users/UsersTodosPage/UsersTodos";
import { userTodosLoader } from "./pages/Users/UsersTodosPage/UsersTodosLoader";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "users/:userId",
        element: <UsersDetails />,
        loader: userDetailLoader,
        children: [
          {
            path: "posts",
            element: <UsersPosts />,
            loader: userPostsLoader,
          },
          {
            path: "posts/:id",
            element: <UsersPostDetails />,
            loader: userPostsCommentsLoader,
          },
          {
            path: "albums",
            element: <UsersAlbums />,
            loader: userAlbumsLoader,
          },
          {
            path: "albums/:albumId",
            element: <UsersAlbumDetails />,
            loader: userAlbumDetailsLoader,
          },
          {
            path: "todos",
            element: <UsersTodos />,
            loader: userTodosLoader,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
