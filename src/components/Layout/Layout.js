import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";

const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const location = useLocation();

  const routesWithoutNavbar = ["/AdminPanel", "/AdminLogin", "/AdminRegister", "/RestauPanel"];

  // Check if the current route is in the list
  const hideNavbar = routesWithoutNavbar.includes(location.pathname);

  return (
    <div>
      {!hideNavbar && <Header />}
      {showCart && <Carts />}
      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
