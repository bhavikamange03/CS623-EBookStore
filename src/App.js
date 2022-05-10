import React, { useState, useEffect } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksGrid from "./components/BooksGrid/BooksGrid";
import Filter from "./components/Filter/Filter";
import { Row, Card, Col, Container } from 'react-bootstrap';
import Badge from "@material-ui/core/Badge";
import { BrowserRouter, NavLink, Route, Switch, useHistory } from "react-router-dom";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import premiumContent from "./components/premiumContent";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { getToken, getUser, setUserSession, resetUserSession, isLoggedInUser } from "./service/AuthService";
import axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Payment from "./components/Payment/payment";
import AddToCart from "./components/AddToCart/addToCart";

const booksUrl = " https://vj0owxzcge.execute-api.us-east-1.amazonaws.com/prod/book";

const verifyUrl = 'https://vj0owxzcge.execute-api.us-east-1.amazonaws.com/prod/verify';

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isUserLoggedIn, setLoggedInUser] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchText, setSearchText] = useState('');
  const [booksFilterData, setSelectedBooks] = useState([]);
  const [BookData, setBooks] = useState([]);
  const [itemCount, setItemCount] = React.useState(0);

  let history = useHistory();

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'T4qVraIt7M5NSlsETvhL8gGpmOCwx8oFhKpfJWc0',
        // 'Access-Control-Allow-Origin': "*",
      }
    }

    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyUrl, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenticating(false);
    })
  }, [])

  useEffect(() => {

    const requestConfig = {
      headers: {
        'x-api-key': 'T4qVraIt7M5NSlsETvhL8gGpmOCwx8oFhKpfJWc0',
      }
    }

    axios.get(booksUrl, requestConfig).then(response => {
      if (response?.data?.Items && response?.data?.Count > 0) {
        setBooks(response.data.Items);
        setSelectedBooks(response.data.Items);
      } else {
        setBooks([]);
        setSelectedBooks([]);
      }
    }).catch((error) => {
      setBooks([]);
      setSelectedBooks([]);
    })
  }, [])

  useEffect(() => {
    processCartItems();
  }, 0);


  const filterConfig = {
    filters: [
      {
        name: "categories",
        id: "categories",
        data: [
          { id: "baking", label: "Baking", checked: false},
          { id: "climate change", label: "Climate Change", checked: false},
          { id: "cooking", label: "Cooking", checked: false },
          { id: "development", label: "Development", checked: false },
          { id: "diet", label: "Diet", checked: false},
          { id: "earth", label: "Earth", checked: false},
          { id: "health", label: "Health", checked: false },
          { id: "programming", label: "Programming", checked: false },
          { id: "networking", label: "Networking", checked: false },
          { id: "database", label: "Database", checked: false },
          { id: "environment", label: "Environment", checked: false },
          { id: "business", label: "Business", checked: false },
          { id: "autobiography", label: "Autobiography", checked: false }       
        ]
      },
      {
        name: "author",
        id: "author",
        data: [
          { id: "Barry A. Burd", label: "Barry A. Burd", checked: false },
          { id: "Bill Blunden", label: "Bill Blunden", checked: false },
          { id: "Brent Schlender", label: "Brent Schlender", checked: false },
          { id: "Bruce Williams", label: "Bruce Williams", checked: false },
          { id: "C. Dorland", label: "C. Dorland", checked: false },
          { id: "Daniel T. DiMuzio", label: "Daniel T. DiMuzio", checked: false },
          { id: "Gareth M. Evans", label: "Gareth M. Evans", checked: false },
          { id: "Jim M. Lynch", label: "Jim M. Lynch", checked: false },
          { id: "John Keifer", label: "John Keifer", checked: false },
          { id: "John Mueller", label: "John Mueller", checked: false },
          { id: "Jun-ichiro-itojun Hagino", label: "Jun-ichiro-itojun Hagino", checked: false },
          { id: "Kyle Banker", label: "Kyle Banker", checked: false },
          { id: "Michael Hetherington", label: "Michael Hetherington", checked: false },
          { id: "Nicholas Bjorn", label: "Nicholas Bjorn", checked: false },
          { id: "Rober W Sebesta", label: "Rober W Sebesta", checked: false },
          { id: "Stephen R Covey", label: "Stephen R Covey", checked: false },
          { id: "Susan McQuillan", label: "Susan McQuillan", checked: false }
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

  const token = getToken();

  if (isAuthenticating && token) {
    return <div>Authenticating...</div>
  }

  const logoutApp = () => {
    resetUserSession();
  };

  function processCartItems() {
    let items = getCartItems() || {};

    if (items) {
      const keys = Object.keys(items) || [];
      const keyLen = keys?.length || 0
      setItemCount(keyLen);
    }
  }

  function getCartItems() {
    if (isLoggedInUser()) {
      let user = getUser();
      let cartItems = localStorage.getItem(`cartItems-${user?.username}`);
      if (cartItems === "undefined" || cartItems === "null" || cartItems === "null" || !cartItems) {
        cartItems = {};
      } else {
        cartItems = JSON.parse(cartItems);
      }
      return cartItems;
    }
    return {};
  }

  function Homepage(history) {
    processCartItems();
    return (
      <Container fluid>
        <div className="logo-wrapper mt-3">
          <div className="pos-left">
            <NavLink to="/">
              <img src={`/logo.png`} alt="ebook icons" width="48" />
            </NavLink>
          </div>
          <div className="pos-right">
            {!isLoggedInUser() && <NavLink to="/login">Sign In</NavLink>}
            {isLoggedInUser() && 
              <div className="my-2">
                <NavLink to="/cart" className="mx-3">
                <Badge color="secondary" badgeContent={itemCount}>
                  <ShoppingCartIcon id="cartBtn"/>
                </Badge>
                </NavLink>
                <NavLink to="/login">
                  <ExitToAppIcon id="logoutBtn" onClick={logoutApp} />
                </NavLink>
              </div>
            }
          </div>
        </div>
        <Row className="w-100">
          <Col xs={3}>
          </Col>
          <Col xs={9}>
            <Container fluid className="">
              <SearchBar placeholder="Search" searchChangeCallback={(searchTerm) => handleSearchChange(searchTerm)} />
            </Container>
          </Col>
        </Row>
        <Row className="w-100">
          <Col xs={3}>
            <Filter config={filterConfig} filterCallback={(config) => handleFilterChange(config)}></Filter>
          </Col>
          <Col xs={9}>
            <BooksGrid data={booksFilterData} updateCartCallback={() => processCartItems()}/>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={(history) => Homepage(history)} />
          <PublicRoute exact path="/register" component={Register} />
          <PublicRoute exact path="/login" component={Login} />
          {/* <PrivateRoute exact path="/premium-content" component={premiumContent} /> */}
          <PrivateRoute exact path="/checkout" component={Payment} />
          <PrivateRoute exact path="/cart" component={AddToCart} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
{/* <Route path='/mypath/:username' exact render= {routeProps =><MyCompo {...routeProps} key={document.location.href} />} /> */}
export default App;
