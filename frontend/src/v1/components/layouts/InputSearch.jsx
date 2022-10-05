import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { DATA } from "../../../data/Data";
import useDebounce from "../../hooks/useDebounce";
const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const searchCharacters = async (search) => {
    const apikey = "http://localhost:8888/";
    return fetch(apikey, { method: "GET" })
      .then((r) => r.json())
      .then((r) => r.data.title)
      .catch((err) => {
        console.error(err);
        return [];
      });
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
      });
    }
    else {
      setResults([]);
      setIsSearching(false);
    }

    return () => {};
  }, []);

  return (
    <>
      <form>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch />
        </button>
      </form>
      {isSearching && <div>Searching ...</div>}
      {results.length !== 0 && (
        <div className="table-search">
          <ul className="search-list">
            {results.map((data) => {
              return (
                <li className="serach-list-items" key={data.title}>
                  {data.title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default InputSearch;
