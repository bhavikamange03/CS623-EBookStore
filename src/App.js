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
          {id: "health", label: "Health", checked: false},
          {id: "cooking", label: "Cooking", checked: false},
          {id: "development", label: "Self-Development", checked: false},
          {id: "programming", label: "Programming", checked: false},
          {id: "networking", label: "Networking", checked: false},
          {id: "database", label: "Database", checked: false},
          {id: "environment", label: "Environment", checked: false},
          {id: "business", label: "Business", checked: false},
          {id: "autobiography", label: "Autobiography", checked: false}
        ]
      },
      {
        name: "author",
        id: "author",
        data: [
          {id: "Barry A. Burd", label: "Barry A. Burd", checked: false},
          {id: "Bill Blunden", label: "Bill Blunden", checked: false},
          {id: "Brent Schlender", label: "Brent Schlender", checked: false},
          {id: "Bruce Williams", label: "Bruce Williams", checked: false},
          {id: "C. Dorland", label: "C. Dorland", checked: false},
          {id: "Daniel T. DiMuzio", label: "Daniel T. DiMuzio", checked: false},
          {id: "Gareth M. Evans", label: "Gareth M. Evans", checked: false},
          {id: "Jim M. Lynch", label: "Jim M. Lynch", checked: false},
          {id: "John Keifer", label: "John Keifer", checked: false},
          {id: "John Mueller", label: "John Mueller", checked: false},
          {id: "Jun-ichiro-itojun Hagino", label: "Jun-ichiro-itojun Hagino", checked: false},
          {id: "Kyle Banker", label: "Kyle Banker", checked: false},
          {id: "Michael Hetherington", label: "Michael Hetherington", checked: false},
          {id: "Nicholas Bjorn", label: "Nicholas Bjorn", checked: false},  
          {id: "Rober W Sebesta", label: "Rober W Sebesta", checked: false},
          {id: "Stephen R Covey", label: "Stephen R Covey", checked: false},
          {id: "Susan McQuillan", label: "Susan McQuillan", checked: false}
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
