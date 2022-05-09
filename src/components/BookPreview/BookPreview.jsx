import React, { useState } from "react";
import "./BookPreview.scss";
import { Row, Card, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap';
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { useHistory } from "react-router-dom";
import { getToken, getUser, setUserSession, resetUserSession, isLoggedInUser } from "../../service/AuthService";

function BookPreview(props) {
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
        console.log(cartItems);
        cartItems = JSON.stringify(cartItems);
        localStorage.setItem(`cartItems-${user?.username}`, cartItems);

        if (routeToCheckout) {
          history.push('/payment');
        }
      } else {
        history.push('/login');
      }
    }


    const downloadBook = (book) => {
      const link = document.createElement('a');
      link.href = book?.bookUrl; 
      console.log(link.href)
      link.download = `${book.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      props.onHide();
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
            <Modal.Title id="contained-modal-title-vcenter" title={props?.data?.title || ''} style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",  width: "95%", display: "inline-block"}}>
              {props?.data?.title || ''}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Container fluid className="py-5">
                  <Row className="books-preview-container">
                      <Col xs={3}>
                          <div style={{backgroundImage: `url(${props?.data?.thumbnailUrl})`}} className="bg-img position-relative"></div>
                      </Col>
                      <Col xs={9}>
                          <div className="">
                              {props?.data?.shortDescription}
                          </div>
                          <div className="book-details book-price mt-3 mb-2">
                            {`$${props?.data?.price}`}
                          </div>
                          <Button className="mt-4 d-block add-cart-btn" onClick={() => addToCart(props?.data, false)}>Add to Cart</Button>
                          <Button className="mt-4 d-block buy-now-btn" onClick={() => buyNow(props?.data)}>Buy Now</Button>
                      </Col>
                  </Row>
              </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => props.onHide()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

  export default BookPreview;