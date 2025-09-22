import { Outlet } from "react-router-dom";
import NavbarBS from "../components/NavbarBS";

function RootLayout() {
  return (
    <div>
      <NavbarBS />
      <Outlet />
    </div>
  );
}

export default RootLayout;
