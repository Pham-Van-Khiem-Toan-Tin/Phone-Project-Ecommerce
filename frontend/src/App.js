import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './v1/components/layouts/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './v1/components/Home/Home';
import Categories from './v1/components/categories/Categories';
import Contact from './v1/components/Contact/Contact';
import Cart from './v1/components/Cart/Cart';
import User from './v1/components/User/User';
import About from './v1/components/About/About';
import Admin from './v1/components/Admin/Admin';
import Footer from './v1/components/layouts/Footer';
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
      <Route path='/admin' element={<Admin />} />
     </Routes> 
     <Footer />
    </>
  );
}

export default App;
