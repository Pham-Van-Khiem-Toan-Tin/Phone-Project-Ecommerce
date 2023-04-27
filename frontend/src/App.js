import Header from "./v1/components/layouts/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./v1/pages/Home/Home";
import Categories from "./v1/pages/categories/Categories";
import Contact from "./v1/pages/Contact/Contact";
import Cart from "./v1/pages/Cart/Cart";
import Footer from "./v1/components/layouts/Footer";
import About from "./v1/pages/About/About";
import { ToastContainer } from "react-toastify";
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
import "./App.css"
import Orders from "./v1/pages/Admin/Orders";
import AllUser from "./v1/pages/Admin/AllUser";
import UpdateUser from "./v1/pages/Admin/UpdateUser";
import Productdetail from "./v1/pages/ProductDetail/Productdetail";
import Shipping from "./v1/pages/Shipping/Shipping";
import OrderConFirm from "./v1/pages/OrderConfirm/OrderConFirm";
import Payment from "./v1/pages/Payment/Payment";


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Productdetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginAndSignUp />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/account"
          element={<ProtectRoute children={<Profile />} />}
        />
        <Route path="/cart" element={<ProtectRoute children={<Cart />} />} />
        <Route path="/shipping" element={<ProtectRoute children={<Shipping />} />} />
        <Route path="/order/confirm" element={<ProtectRoute children={<OrderConFirm />} />} />
        <Route path="/payment" element={<ProtectRoute children={<Payment />} />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectRoute isAdmin={true} children={<DashBoard />} />}
        />
        <Route
          path="/admin/allproducts"
          element={<ProtectRoute isAdmin={true} children={<AllProduct />} />}
        />
        <Route
          path="/admin/newproduct"
          element={<ProtectRoute isAdmin={true} children={<CreateProduct />} />}
        />
        <Route
          path="/admin/product/:id"
          element={<ProtectRoute isAdmin={true} children={<UpdateProduct />} />}
        />
        <Route
          path="/admin/product/orders"
          element={<ProtectRoute isAdmin={true} children={<Orders />} />}
        />
        <Route
          path="/admin/allusers"
          element={<ProtectRoute isAdmin={true} children={<AllUser />} />}
        />
        <Route
          path="/admin/user/:id"
          element={<ProtectRoute isAdmin={true} children={<UpdateUser />} />}
        />
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
      {/* Same as */}

      <Footer />
    </>
  );
}

export default App;
