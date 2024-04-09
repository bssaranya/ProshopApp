//import React from "react";
//import { Routes, Route } from "react-router-dom";
//import HomeScreen from "./screens/HomeScreen";
//import ProductScreen from "./screens/ProductScreen";
//import CartScreen from "./screens/CartScreen";
//import LoginScreen from "./screens/LoginScreen";
//import RegisterScreen from './screens/RegisterScreen'
//import ProfileScreen from './screens/ProfileScreen'
//import ShippingScreen from './screens/ShippingScreen'
//import PaymentScreen from './screens/PaymentScreen'
//import PlaceOrderScreen from './screens/PlaceOrderScreen'
//import OrderScreen from './screens/OrderScreen'
//
//function MyRoutes() {
//  return (
//    <Routes>
//      <Route path="/" element={<HomeScreen />} exact />
//      <Route path="/login" element={<LoginScreen />} />
//      <Route path="/register" element={<RegisterScreen />} />
//      <Route path="/profile" element={<ProfileScreen />} />
//      <Route path="/product/:id" element={<ProductScreen />} />
//      <Route path="/order/:orderId" element={< OrderScreen />} />
//      <Route path="/cart/:id?" element={<CartScreen />} />
//      <Route path="/shipping" element={<ShippingScreen />} />
//      <Route path="/payment" element={<PaymentScreen />} />
//      <Route path="/placeorder" element={<PlaceOrderScreen />} />
//    </Routes>
//  );
//}
//
//export default MyRoutes;

import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

// Lazy-loaded screen components
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const ProductScreen = lazy(() => import("./screens/ProductScreen"));
const CartScreen = lazy(() => import("./screens/CartScreen"));
const LoginScreen = lazy(() => import("./screens/LoginScreen"));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));
const ShippingScreen = lazy(() => import("./screens/ShippingScreen"));
const PaymentScreen = lazy(() => import("./screens/PaymentScreen"));
const PlaceOrderScreen = lazy(() => import("./screens/PlaceOrderScreen"));
const OrderScreen = lazy(() => import("./screens/OrderScreen"));

function MyRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/order/:orderId" element={<OrderScreen />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
      </Routes>
    </Suspense>
  );
}

export default MyRoutes;
