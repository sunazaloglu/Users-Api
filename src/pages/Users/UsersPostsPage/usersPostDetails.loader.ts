import type { LoaderFunctionArgs } from "react-router-dom";

export const userPostsCommentsLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const [postResponse, commentsResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`),
  ]);

  const post = await postResponse.json();
  const comments = await commentsResponse.json();

  return { post, comments };
};
