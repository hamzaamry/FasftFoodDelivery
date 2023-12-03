import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RestauRequest from "../pages/Restau/RestauRequest"
import DeliveryRequest from "../pages/Delivery/DeliveryRequest"


import AdminPanel from "../pages/Admin/AdminPanel"
import AdminLogin from "../pages/Admin/AdminLogin"
import AdminRegister from "../pages/Admin/AdminRegister"

import RestauAuth from "../pages/Restau/RestauAuth";
import DeliveryAuth from "../pages/Delivery/DeliveryAuth";

import RestauPanel from '../pages/Restau/RestauPanel'
import DeliveryGuyOrders from '../pages/Delivery/DeliveryGuyOrders'

import AboutClient from "../pages/AboutClient";
import Recommendations from "../pages/Recommendations"

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/Restaurant" element={<RestauRequest />} />
      <Route path="/Delivery" element={<DeliveryRequest />} />

      <Route path="/AdminPanel" element={<AdminPanel />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
      <Route path="/AdminRegister" element={<AdminRegister />} />

      <Route path="/RestauAuth" element={<RestauAuth />} />
      <Route path="/DeliveryAuth" element={<DeliveryAuth />} />

      <Route path="/RestauPanel" element={<RestauPanel />} />
      <Route path="/DeliveryGuyOrders" element={<DeliveryGuyOrders />} />

      <Route path="/AboutClient" element={<AboutClient />} />
      <Route path="/Recommendations" element={<Recommendations />} />


    </Routes>
  );
};

export default Routers;
