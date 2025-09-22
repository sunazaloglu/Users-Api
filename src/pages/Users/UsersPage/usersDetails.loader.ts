import type { LoaderFunctionArgs } from "react-router-dom";

//  Belirli bir kullanıcının detaylarını API'den yükler.

//params yazmamizdaki sebep usersdan sonra dinamik olarak kullandigim ne varsa bunu bir obje
//  olarak getiriyor {userId: 1 } biz de bunu asagida bu sekilde kullanabiliyoruz
export const userDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const userDetail = await response.json();
  return userDetail;
};
