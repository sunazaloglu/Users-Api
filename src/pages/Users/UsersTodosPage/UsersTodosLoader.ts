import type { LoaderFunctionArgs } from "react-router-dom";

export const userTodosLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}/todos`
  );
  const todos = await response.json();
  return todos;
};
