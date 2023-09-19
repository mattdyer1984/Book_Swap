import { FaSearch } from "react-icons/fa";
import "./searchbar.css";
import { useState } from "react";

function SearchBar(props) {
  const [input, setInput] = useState("");

  function handleChange(event) {
    setInput(event.target.value);
    props.setSearch(input);
  }

  return (
    <div className="searchbar">
      <FaSearch id="search-icon" />
      <input
        id="search-input"
        type="input"
        placeholder="Search"
        onChange={handleChange}
      />
    </div>
  );
}
export default SearchBar;
