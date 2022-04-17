import React from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import BookData from "./data.json";
import BooksGrid from "./components/BooksGrid/BooksGrid";
import { Row, Card, Col, Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row className="">
          <Col md={2}>
            left filter
          </Col>
          <Col md={10}>
            <SearchBar placeholder="Search" data={BookData}/>
            <BooksGrid data={BookData}/>
          </Col>
        </Row>
      </Container>
      {/* <SearchBar placeholder="Enter a Book Name..." data={BookData} /> */}
      {/* <BooksGrid data={BookData}/> */}
    </div>
  );
}

export default App;
