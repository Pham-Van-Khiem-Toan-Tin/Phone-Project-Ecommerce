import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./inputSearch.css";
import useDebounce from "../../hooks/useDebounce";
const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const searchCharacters = async (search) => {
    
  };
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
    <div className="input-search">
      <form>
        <button>
          <FaSearch />
        </button>
        <input
        className="rounded form-control"
          type="text"
          value={searchTerm}
          placeholder="Search key word ..."
          onChange={searchSubmitHandle}
        />
      </form>
    </div>
  );
};

export default InputSearch;
