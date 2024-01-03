import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./inputSearch.css";
import useDebounce from "../../hooks/useDebounce";
const InputSearch = () => {
  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandle = (e) => {
    console.log("chay vao day");
    e.preventDefault();
    console.log(e.target.value);
    setKeyword(e.target.value);
    console.log(keyword);
  };
  const handleSearch = () => {
    navigate(`../../product/${keyword}`)
  }
  return (
    <div className="input-search">
      <form>
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
        <input
          className="rounded form-control"
          type="text"
          value={keyword}
          placeholder="Search key word ..."
          onChange={searchSubmitHandle}
        />
      </form>
    </div>
  );
};

export default InputSearch;
