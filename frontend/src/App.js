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
import User from "./v1/pages/User/User";
import Admin from "./v1/pages/Admin/Admin";
import Footer from "./v1/components/layouts/Footer";
import About from "./v1/pages/About/About";

function App() {
  const path = useLocation();
  console.log(path);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
