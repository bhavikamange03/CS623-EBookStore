import React, { useState, useEffect } from "react";
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils';

import { useHistory } from "react-router-dom";
import { Row, Button, Col, Container } from 'react-bootstrap';
import { getToken, getUser, setUserSession, resetUserSession, isLoggedInUser } from "../../service/AuthService";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";

function Payment() {
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);

  let history = useHistory();

  useEffect(() => {
    processCartItems();
  }, []);


  function processCartItems() {
    let items = getCartItems() || {};
    let itemData = [];

    if (items) {
      const keys = Object.keys(items) || [];

      if (keys?.length > 0) {
        keys.forEach((key) => {
          itemData.push(items[key]);
        });

        const total = itemData.reduce(function (sum, item) {
          return sum + item.price;
        }, 0);

        setCartList(itemData);
        setTotal(total);
      } else {
        setCartList([]);
        setTotal(0)
      }
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

  const onSubmit = async values => {
    if (cartList?.length > 0) {
      for (let i = 0; i < cartList.length; i++) {
        downloadBook(cartList[i]);
      }
    }
  }

  const required = value => (value ? undefined : 'Required')

  const logoutApp = () => {
    resetUserSession();
  };

  function downloadBook(book) {
    const link = document.createElement('a');
    link.href = book?.bookUrl;
    link.id = `id-${book._id}`;
    link.download = `${book.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container fluid className="">
      <div className="pos-left mt-2">
        <NavLink to="/" >
          <img src={`/logo.png`} alt="ebook icons" width="48" />
        </NavLink>
      </div>
      <div className="pos-right mt-4 mx-4">   
        <div className="my-2">
          <NavLink to="/cart" className="mx-3">
          <Badge color="secondary" badgeContent={cartList?.length || 0}>
            <ShoppingCartIcon id="cartBtn"/>
          </Badge>
          </NavLink>
          <NavLink to="/login">
            <ExitToAppIcon id="logoutBtn" onClick={logoutApp} />
          </NavLink>
        </div>
      </div>
      <Row className="checkout-container my-5 pt-5">
        <Col xl={6} lg={6} md={6} sm={12} xs={12} className="payment-wrapper">
          <Styles>
            <Form
              onSubmit={onSubmit}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
                active
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Card
                      number={values.number || ''}
                      name={values.name || ''}
                      expiry={values.expiry || ''}
                      cvc={values.cvc || ''}
                      focused={active}
                    />
                    <div>
                      <Field
                        name="number"
                        component="input"
                        type="text"
                        pattern="[\d| ]{16,22}"
                        placeholder="Card Number"
                        format={formatCreditCardNumber}
                        validate={required}
                      />
                    </div>
                    <div>
                      <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Name"
                        validate={required}
                      />
                    </div>
                    <div>
                      <Field
                        name="expiry"
                        component="input"
                        type="text"
                        pattern="\d\d/\d\d"
                        placeholder="Valid Thru"
                        format={formatExpirationDate}
                        validate={required}
                      />
                      <Field
                        name="cvc"
                        component="input"
                        type="text"
                        pattern="\d{3,4}"
                        placeholder="CVC"
                        format={formatCVC}
                        validate={required}
                      />
                    </div>
                    <div className="buttons">
                      <button type="submit" disabled={submitting}>
                        Place Your Order
                      </button>
                      <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                    </button>
                    </div>
                  </form>
                )
              }}
            />
          </Styles>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12} className="order-summary-wrapper">
          <div className="mt-5">
            <div className="order-summary-title">
              Order summary
            </div>
            <div className="order-total">
              <Row className="order-item">
                <Col xs={6}>
                  {`Items: ${cartList?.length || 0}`}
                </Col>
                <Col xs={6}>
                  {total}
                </Col>
              </Row>
              <Row className="order-item">
                <Col xs={6}>
                  Estimated tax to be collected:
                </Col>
                <Col xs={6}>
                  {total * 0.090}
                </Col>
              </Row>
              <Row className="order-item">
                <Col xs={6}>Order total:</Col>
                <Col xs={6}>
                  {total * 1.090}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Payment
