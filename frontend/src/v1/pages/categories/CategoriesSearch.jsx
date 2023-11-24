import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const CategoriesSearch = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandle = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            navigate(`/product/${keyword}`);
        } else {
            navigate("/categories");
        }
    }
  return (
    <div className="search_keyword">
      <form onSubmit={searchSubmitHandle}>
        <input type="text" placeholder="Search..." onChange={(e) => setKeyword(e.target.value)} />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default CategoriesSearch;
