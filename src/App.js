import React from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import BookData from "./data.json";
import BooksGrid from "./components/BooksGrid/BooksGrid";
import Filter from "./components/Filter/Filter";
import { Row, Card, Col, Container } from 'react-bootstrap';

function App() {

  const filterConfig = {
    filters: [
      {
        name: "categories",
        id: "categories",
        data: [
          {id: "novel", label: "Novel", checked: false},
          {id: "fiction", label: "Fiction", checked: false},
          {id: "non-fiction", label: "Non Fiction", checked: false},
          {id: "education", label: "Education", checked: false},
          {id: "computer", label: "Computers", checked: false},
          {id: "business", label: "Business", checked: false},
          {id: "internet", label: "Internet", checked: false},
        ]
      },
      {
        name: "author",
        id: "author",
        data: [
          {id: "W. Frank", label: "W. Frank", checked: false},
          {id: "Charlie Collins", label: "Charlie Collins", checked: false},
          {id: "Robi Sen", label: "Robi Sen", checked: false},
          {id: "Faisal Abid", label: "Faisal Abid", checked: false},
        ]
      }
    ]
  }

  const handleFilterChange = (config) => {
    console.log('config', config);
  };


  return (
    <div className="App">
      <Container fluid>
        <Row className="">
          <Col md={2}>
            <Filter config={filterConfig} filterCallback={(config) => handleFilterChange(config)}></Filter>
          </Col>
          <Col md={10}>
            <SearchBar placeholder="Search" data={BookData}/>
            <BooksGrid data={BookData}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
