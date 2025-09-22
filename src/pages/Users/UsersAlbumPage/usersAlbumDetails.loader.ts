import type { LoaderFunctionArgs } from "react-router-dom";

export const userAlbumDetailsLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const [albumResponse, photosResponse, userResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${params.albumId}`),
    fetch(
      `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
    ),
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`),
  ]);

  const album = await albumResponse.json();
  const photos = await photosResponse.json();
  const user = await userResponse.json();

  return { album, photos, user };
};
