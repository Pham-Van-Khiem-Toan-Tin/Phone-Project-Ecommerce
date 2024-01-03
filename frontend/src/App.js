import Header from "./v1/components/layouts/Header";
import {  Route, Routes } from "react-router-dom";
import Home from "./v1/pages/Home/Home";
import Categories from "./v1/pages/categories/Categories";
import Contact from "./v1/pages/Contact/Contact";
import Cart from "./v1/pages/Cart/Cart";
import Footer from "./v1/components/layouts/Footer";
import About from "./v1/pages/About/About";
import { ToastContainer, toast } from "react-toastify";
import LoginAndSignUp from "./v1/pages/User/LoginAndSignUp";
import Profile from "./v1/pages/User/Profile";
import ProtectRoute from "./v1/Route/ProtectRoute";
import "react-toastify/dist/ReactToastify.css";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./v1/pages/Admin/DashBoard";
import AllProduct from "./v1/pages/Admin/AllProduct";
import CreateProduct from "./v1/pages/Admin/CreateProduct";
import UpdateProduct from "./v1/pages/Admin/UpdateProduct";
import "./App.css";
import OrdersAdmin from "./v1/pages/Admin/OrdersAdmin";
import AllUser from "./v1/pages/Admin/AllUser";
import UpdateUser from "./v1/pages/Admin/UpdateUser";
import Productdetail from "./v1/pages/ProductDetail/Productdetail";
import Shipping from "./v1/pages/Shipping/Shipping";
import OrderConFirm from "./v1/pages/OrderConfirm/OrderConFirm";
import Payment from "./v1/pages/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import OrderSuccess from "./v1/pages/Payment/OrderSuccess";
import { useDispatch } from "react-redux";
import { getAccount } from "./v1/reduxToolkit/actions/userAction";
import MyOrders from "./v1/pages/Orders/MyOrders";
import OrderDetail from "./v1/pages/Orders/OrderDetail";
import ProcessOrder from "./v1/pages/Admin/ProcessOrder";
import UpdateProfile from "./v1/pages/User/UpdateProfile";
import UpdatePassword from "./v1/pages/User/UpdatePassword";
import ForgotPassword from "./v1/pages/User/ForgotPassword";
import ResetPassword from "./v1/pages/User/ResetPassword";
import ProductReview from "./v1/pages/Admin/ProductReview";
import NotFound from "./v1/pages/NotFound/NotFound";
import { socket } from "./socket";
import AdminHeader from "./v1/components/layouts/AdminHeader";
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const stripePromise = loadStripe(
    "pk_test_51N1RFRJt1tz4StSkzTUdq8lq3KZC2XWUdkXxzMMooea7J3X3TdZlAVeKC3qM1p4MaA5KQjvpuLqT6hYDdsp1iiui00gYWdz4T1"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      dispatch(getAccount());
    }
  }, [dispatch]);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route path="/categories" element={<Categories HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route path="/product/:keyword" element={<Categories HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route path="/categories/:id" element={<Productdetail HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route path="/contact" element={<Contact HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route path="/login" element={<LoginAndSignUp HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route path="/about" element={<About HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route path="/password/forgot" element={<ForgotPassword HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route path="/password/reset/:token" element={<ResetPassword HeaderComponent={Header} FooterComponent={Footer}/>} />
        <Route
          path="/account"
          element={<ProtectRoute children={<Profile HeaderComponent={Header} FooterComponent={Footer}/>} />}
        />
        <Route
          path="/me/update"
          element={<ProtectRoute children={<UpdateProfile HeaderComponent={Header} FooterComponent={Footer}/>} />}
        />
        <Route
          path="/password/update"
          element={<ProtectRoute children={<UpdatePassword HeaderComponent={Header} FooterComponent={Footer}/>} />}
        />
        <Route path="/cart" element={<ProtectRoute children={<Cart HeaderComponent={Header} FooterComponent={Footer}/>} />} />
        <Route
          path="/shipping"
          element={<ProtectRoute children={<Shipping HeaderComponent={Header} FooterComponent={Footer}/>} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectRoute children={<OrderConFirm HeaderComponent={Header} FooterComponent={Footer}/>} />}
        />
        <Route
          path="/payment"
          element={
            <ProtectRoute
              children={
                <Elements stripe={stripePromise}>
                  <Payment HeaderComponent={Header} FooterComponent={Footer}/>
                </Elements>
              }
            />
          }
        />
        <Route
          path="/success"
          element={<ProtectRoute children={<OrderSuccess HeaderComponent={Header} FooterComponent={Footer}/>} />}
        />
        <Route
          path="/orders"
          element={<ProtectRoute children={<MyOrders HeaderComponent={Header} FooterComponent={Footer}/>} />}
        />
        <Route
          path="/order/:id"
          element={<ProtectRoute children={<OrderDetail HeaderComponent={Header} FooterComponent={Footer}/>} />}
        />
        <Route
          path="/admin/dashboard" 
          element={<ProtectRoute isAdmin={true} children={<DashBoard ChildrenComponent={AdminHeader}/>} />}
        />
        <Route
          path="/admin/all-products" 
          element={<ProtectRoute isAdmin={true} children={<AllProduct ChildrenComponent={AdminHeader}/>} />}
        />
        <Route
          path="/admin/new-product" 
          element={<ProtectRoute isAdmin={true} children={<CreateProduct ChildrenComponent={AdminHeader}/>} />}
        />
        <Route
          path="/admin/product/:id" 
          element={<ProtectRoute isAdmin={true} children={<UpdateProduct ChildrenComponent={AdminHeader}/>} />}
        />
        <Route
          path="/admin/all-orders" 
          element={<ProtectRoute isAdmin={true} children={<OrdersAdmin ChildrenComponent={AdminHeader}/>} />}
        />
        <Route
          path="/admin/order/:id"
          element={<ProtectRoute isAdmin={true} children={<ProcessOrder ChildrenComponent={AdminHeader}/>} />}
        />
        <Route
          path="/admin/all-users" 
          element={<ProtectRoute isAdmin={true} children={<AllUser ChildrenComponent={AdminHeader}/>} />}
        />
        <Route
          path="/admin/user/:id" 
          element={<ProtectRoute isAdmin={true} children={<UpdateUser ChildrenComponent={AdminHeader}/>} />}
        />
        <Route
          path="/admin/reviews" 
          element={<ProtectRoute isAdmin={true} children={<ProductReview ChildrenComponent={AdminHeader}/>} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
