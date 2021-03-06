import React, { useState } from "react";
import "./BooksGrid.scss";
import { Row, Card, Col, Container } from 'react-bootstrap';
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import BookPreview from "../BookPreview/BookPreview";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { getToken, getUser, setUserSession, resetUserSession, isLoggedInUser } from "../../service/AuthService";
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function BooksGrid({ data, updateCartCallback}) {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  let history = useHistory();

  const showBookDetails = (book) => {
    setSelectedBook(book);
    setModalShow(true);
  }

  function getCartItems() {
    if (isLoggedInUser()) {
      let user = getUser();
      let cartItems = localStorage.getItem(`cartItems-${user?.username}`);
      if (cartItems === "undefined" || cartItems === "null" || !cartItems) {
        cartItems = {};
      } else {
        cartItems = JSON.parse(cartItems);
      }
      return cartItems;
    }
    return {};
  }

  function setCartItems(item) {
    if (isLoggedInUser() && item) {
      let user = getUser();
      let cartItems = getCartItems() || {};
      
      cartItems[item?._id] = item;

      if (cartItems) {
        cartItems = JSON.stringify(cartItems);
      }
     
      localStorage.setItem(`cartItems-${user?.username}`, cartItems);
      handleClick();
      updateCartCallback();
    } else {
      history.push('/login');
    }
  }

  const addToCart = (book) => {
    setCartItems(book);
  }

  function downloadBook(book) {
    const link = document.createElement('a');
    link.href = book?.bookUrl; 
    link.download = `${book.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setModalShow(false);
  };
  
  function download(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    });
  }
  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <>
        <Container fluid className="my-5">
          <Row className="books-container">
            {data?.length !== 0 && data.map((book, index) => {
              return (
                <Col xl={4} lg={4} md={6} sm={6} xs={12} key={index} className="book-wrapper">
                  <Card className="book-item-holder">
                    <div className="book-item">
                      <div className="bg-img-wrapper">
                      <div style={{backgroundImage: `url(${book?.thumbnailUrl})`}} className="bg-img position-relative"></div>
                        {/* <div className={`bg-img position-relative i-${book?._id}`}></div> */}
                      </div>
                      <div className="book-details mt-3" title={book?.title || ''}>
                        {book?.title || 'NA'}
                      </div>
                      <div className="book-details book-price mt-2">
                        {`$${book?.price}`}
                      </div>
                    </div>
                    <div className="book-overlay"></div>
                    <div className="book-overlay-content">
                      <div className="book-overlay-content-wrapper">
                        <i className="mx-2 p-1 cursor-pointer" onClick={() => showBookDetails(book)}><RemoveRedEyeIcon /></i>
                        {/* <i className="p-1 cursor-pointer" onClick={() => downloadBook(book)}> <CloudDownloadIcon /></i> */}
                        <i className="mx-2 p-1 cursor-pointer" onClick={() => addToCart(book)}> <ShoppingCartIcon /></i>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
            {data?.length === 0 &&
              <Col xs={12}>
                <div className="d-flex justify-content-center align-middle no-data-block mt-5 pt-5">
                    No data available
                </div>
              </Col>
            }
          </Row>
        </Container>
        <BookPreview
          show={modalShow}
          onHide={() => { setModalShow(false); updateCartCallback(); }}
          data={selectedBook}
          // pdfdownload={() => downloadBook(selectedBook)}
        />
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Book added to the cart successfully!
          </Alert>
        </Snackbar>
      </>
  );

}

export default BooksGrid;