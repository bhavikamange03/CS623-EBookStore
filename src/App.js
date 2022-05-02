import React, { useState } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import BookData from "./data.json";
import BooksGrid from "./components/BooksGrid/BooksGrid";
import Filter from "./components/Filter/Filter";
import { Row, Card, Col, Container } from 'react-bootstrap';

function App() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchText, setSearchText] = useState('');
  const [booksFilterData, setSelectedBooks] = useState(BookData);


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
          {id: "environment", label: "Environment", checked: false}
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
          {id: "John Mueller", label: "John Mueller", checked: false}
        ]
      }
    ]
  }

  const handleFilterChange = (config) => {
    setSelectedFilters(config);
    processData(BookData, config);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchText(searchTerm);
    processData(BookData, selectedFilters, searchTerm);
  };

  function processData(booksData, filters, searchTerm = '') {
    let filterObject = {};

    if (booksData?.length > 0) {
      
      let filterKeys = [];
      let categoriesKeys = [];
      let authorKeys = [];
  
      if (filters) {
        filterKeys = Object.keys(filters);
    
        if (filterKeys?.length > 0) {
          filterKeys.forEach((filter) => {
            if (filter === 'categories') {
              categoriesKeys = Object.keys(filters[filter]);
            } else if (filter === 'author') {
              authorKeys = Object.keys(filters[filter]);
            }
          });
        }
  
        filterObject = {
          categories: categoriesKeys,
          authors: authorKeys
        };
        
        let filteredData = multiPropsFilter(booksData, filterObject);

        filteredData = filteredData.filter(book => {
          return book.title.indexOf(searchTerm) !== -1;
        });

        const booksFilterData1 = JSON.parse(JSON.stringify(filteredData));
        setSelectedBooks(booksFilterData1);
      }
    }
  }

  function multiPropsFilter(products, filters) {
    const filterKeys = Object.keys(filters);
    return products.filter(product => {
      return filterKeys.every(key => {
        if (!filters[key].length) return true;
        // Loops again if product[key] is an array (for material attribute).
        if (Array.isArray(product[key])) {
          return product[key].some(keyEle => filters[key].includes(keyEle));
        }
        return filters[key].includes(product[key]);
      });
    });
  };

  return (
    <div className="App">
      <Container fluid>
        <Row className="">
          <Col md={2}>
            <Filter config={filterConfig} filterCallback={(config) => handleFilterChange(config)}></Filter>
          </Col>
          <Col md={10}>
            <SearchBar placeholder="Search" searchChangeCallback={(searchTerm) => handleSearchChange(searchTerm)}/>
            <BooksGrid data={booksFilterData}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
