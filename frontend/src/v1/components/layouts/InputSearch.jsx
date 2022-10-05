import React, { useCallback, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { DATA } from "../../../data/Data";
const InputSearch = () => {
    const [Data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const typingTimeOutRef = useRef(null);
    const handleInputSearch = (e) => {
        const {value} = e.target;
        setKeyword(value);
        console.log("onchang");
        if(typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
            setData([]);
        }
        typingTimeOutRef.current = setTimeout(() => {
            setData(DATA.filter((data) => data.title.includes(value)))
        },1000)
    }
  return (
    <>
      <form>
        <input type="text" value={keyword} placeholder="Search..." onChange={handleInputSearch}/>
        <button>
          <FaSearch />
        </button>
      </form>
      {Data.length !== 0 && (
        <div className="table-search">
          <ul className="search-list">
            {Data.map((data) => {
                return (<li className="serach-list-items" key={data.title}>{data.title}</li>)
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default InputSearch;
