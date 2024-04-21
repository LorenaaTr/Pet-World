import { Fragment } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const location = useLocation();

  const isDashboardPage = location.pathname === "/dashboard";
  const isUserDashboardPage = location.pathname.startsWith("/dashboard/");

  return (
    <>
      {!isDashboardPage && !isUserDashboardPage && <Header />}
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
