import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./v1/components/layouts/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./v1/pages/Home/Home";
import Categories from "./v1/pages/categories/Categories";
import Contact from "./v1/pages/Contact/Contact";
import Cart from "./v1/pages/Cart/Cart";
import Admin from "./v1/pages/Admin/Admin";
import Footer from "./v1/components/layouts/Footer";
import About from "./v1/pages/About/About";
import { ToastContainer } from "react-toastify";
import LoginAndSignUp from "./v1/pages/User/LoginAndSignUp";
import Profile from "./v1/pages/User/Profile";
import ProtectRoute from "./v1/Route/ProtectRoute";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const path = useLocation();
  console.log(path);
  const userState = useSelector((state) => state.user);
  return (
    <>
      {userState.user === null || userState.user.role !== "admin"?<Header />:null }
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        {userState.isLoading === false && (
          <Route
            path="/account"
            element={<ProtectRoute children={<Profile />} />}
          />
        )}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginAndSignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={500}
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
