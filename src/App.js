// import { Button } from 'react-bootstrap';
import React from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import BookData from "./data.json";

function App() {
  return (
    <div className="App">
      <SearchBar placeholder="Enter a Book Name..." data={BookData} />
    </div>
  );
}

export default App;
