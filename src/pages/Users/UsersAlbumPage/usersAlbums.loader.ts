import type { LoaderFunctionArgs } from "react-router-dom";

export const userAlbumsLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}/albums`
  );
  const albums = await response.json();
  return albums;
};
