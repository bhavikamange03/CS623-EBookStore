import React, { useState } from "react";
import "./SearchBar.scss";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
 
  function showBookDetails(event, item) {
    console.log('showBookDetails item', item);
  }

  return (
    <div className="search position-relative mx-4">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult position-absolute">
          {filteredData.slice(0, 15).map((item, index) => {
            return (
              <li key = {index} className="dataItem" onClick={($event) => showBookDetails($event,item)}>
                <p>{item.title} </p>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;