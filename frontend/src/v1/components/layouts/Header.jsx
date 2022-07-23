import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return <>
  <nav className="navbar navbar-expand-lg">
  <div className="container">
    <Link className="navbar-brand" to="/">Brand</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link"to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user">User</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin">Admin</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="px-2 search" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  </>;
};

export default Header;
