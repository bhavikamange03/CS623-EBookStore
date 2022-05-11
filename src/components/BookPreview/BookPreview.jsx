import React, { useState } from "react";
import "./BookPreview.scss";
import { Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { getToken, getUser, setUserSession, resetUserSession, isLoggedInUser } from "../../service/AuthService";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function BookPreview(props) {
  const [open, setOpen] = React.useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  let history = useHistory();

  function addToCart(item, routeToCheckout = false) {
    setCartItems(item, routeToCheckout);
  }

  function buyNow(item) {
    addToCart(item, true);
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

  function setCartItems(item, routeToCheckout = false) {
    if (isLoggedInUser()) {
      let user = getUser();
      let cartItems = getCartItems() || {};

      cartItems[item._id] = item;

      cartItems = JSON.stringify(cartItems);
      localStorage.setItem(`cartItems-${user?.username}`, cartItems);
      handleClick();
      if (routeToCheckout) {
        history.push('/checkout');
      }
    } else {
      history.push('/login');
    }
  }


  const downloadBook = (book) => {
    const link = document.createElement('a');
    link.href = book?.bookUrl;
    link.download = `${book.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    props.onHide();
  };

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
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" title={props?.data?.title || ''} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "95%", display: "inline-block" }}>
            {props?.data?.title || ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid className="py-5">
            <Row className="books-preview-container">
              <Col xs={3}>
                <div style={{ backgroundImage: `url(${props?.data?.thumbnailUrl})` }} className="bg-img position-relative"></div>
              </Col>
              <Col xs={9}>
                <div className="">
                  {props?.data?.shortDescription}
                </div>
                <div className="book-details book-price mt-3 mb-2">
                  {`$${props?.data?.price}`}
                </div>
                <Button className="mt-4 d-block add-cart-btn" onClick={() => { addToCart(props?.data, false); props.onHide() }}>Add to Cart</Button>
                <Button className="mt-4 d-block buy-now-btn" onClick={() => buyNow(props?.data)}>Buy Now</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.onHide()}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Book added to the cart successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default BookPreview;