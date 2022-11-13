import Header from "./v1/components/layouts/Header";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { useSelector } from "react-redux";
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

function App() {
  const path = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/account"
          element={<ProtectRoute children={<Profile />} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginAndSignUp />} />
        <Route path="/about" element={<About />} />
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
