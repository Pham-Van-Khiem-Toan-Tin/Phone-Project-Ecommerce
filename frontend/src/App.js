import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./v1/components/layouts/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./v1/components/Home/Home";
import Categories from "./v1/components/categories/Categories";
import Contact from "./v1/components/Contact/Contact";
import Cart from "./v1/components/Cart/Cart";
import User from "./v1/components/User/User";
import About from "./v1/components/About/About";
import Admin from "./v1/components/Admin/Admin";
import Footer from "./v1/components/layouts/Footer";
import Blog from "./v1/components/Blog/Blog";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <div
        className="modal fade"
        id="searchModal"
        tabindex="-1"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <div className="d-flex">
                <input
                type="search"
                  className="input-search"
                  placeholder="Search..."
                />
                <button className="btn btn-info" type="submit">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
