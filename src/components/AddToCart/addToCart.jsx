import React, { useEffect } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { getToken, getUser, setUserSession, resetUserSession, isLoggedInUser } from "../../service/AuthService";
import { Row, Button, Col, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export default function AddToCart() {
  const [itemCount, setItemCount] = React.useState(1);
  const [cartList, setCartList] = React.useState([]);
  const [total, setTotal] = React.useState(0);

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

        const total = itemData.reduce(function(sum, item) {
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


  function addToCart(item) {
    setCartItems(item);
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

  function setCartItems(item) {
    if (isLoggedInUser() && item) {
      let user = getUser();
      let cartItems = getCartItems() || {};

      cartItems[item._id] = item;

      console.log(cartItems);
      if (cartItems) {
        cartItems = JSON.stringify(cartItems);
      }

      localStorage.setItem(`cartItems-${user?.username}`, cartItems);
    } else {
      history.push('/login');
    }
  }

  function removeItemFromCart(item) {
    if (isLoggedInUser()) {
      let user = getUser();
      let cartItems = getCartItems() || {};

      delete cartItems[item?._id];

      console.log(cartItems);
      cartItems = JSON.stringify(cartItems);
      localStorage.setItem(`cartItems-${user?.username}`, cartItems);
      processCartItems();
    } else {
      history.push('/login');
    }
  }

  console.log('cartList', cartList);

  function proceedToCheckout(item) {
    history.push('/checkout');
  }

  return (
    <Container fluid className="cart-container">
      <div className="pos-left mt-4 mx-2">
        <NavLink to="/" >
          <img src={`/logo.png`} alt="ebook icons" width="48" />
        </NavLink>
      </div>
      <div className="shopping-cart-wrapper px-5">
        <div className="my-5 page-title">
          Shopping Cart
        </div>
        {cartList?.length !== 0 && cartList.map((item, index) => {
          return (
            <div className="w-100" key={index}>
              <Row className="cart-item-wrapper w-100 mb-4">
                <Col xl={9} lg={9} md={9} sm={9} xs={9} className="">
                  <div className="">
                    {item?.title}
                  </div>
                </Col>
                <Col xl={1} lg={1} md={1} sm={1} xs={1} className="">
                  <div className="">
                    <DeleteIcon className="cursor-pointer" onClick={() => removeItemFromCart(item)} />
                  </div>
                </Col>
                <Col xl={2} lg={2} md={2} sm={2} xs={2} className="">
                  <div className="">
                    {item?.price}
                  </div>
                </Col>
              </Row>
            </div>
          )
        })}
        {cartList?.length === 0 &&
          <Row>
            <Col xs={12}>
              <div className="d-flex justify-content-center align-middle no-data-block mt-5 pt-5">
                Your Cart is empty.
              </div>
            </Col>
          </Row>
        }
        {cartList?.length !== 0 &&
          <Row className="mt-5">
            <Col xs={8}>
              <Button className="d-block proceed-to-checkout-btn" onClick={() => proceedToCheckout()}>Proceed to checkout</Button>
            </Col>
            <Col xs={3} className="px-5">
              <span>
                {`Subtotal (${cartList?.length} items): `}
              </span>
              <span className="font-weight-bold">
                {`$${total}`}
              </span>  
            </Col>
          </Row>
        }
      </div>
    </Container>



    // <div style={{ display: "block", padding: 30 }}>
    //   <div>
    //     <Badge color="secondary" badgeContent={itemCount}>
    //       <ShoppingCartIcon />{" "}
    //     </Badge>
    //     <ButtonGroup>
    //       <Button
    //         onClick={() => {
    //           setItemCount(Math.max(itemCount - 1, 0));
    //         }}
    //       >
    //         {" "}
    //         <RemoveIcon fontSize="small" />
    //       </Button>
    //       <Button
    //         onClick={() => {
    //           setItemCount(itemCount + 1);
    //         }}
    //       >
    //         {" "}
    //         <AddIcon fontSize="small" />
    //       </Button>
    //     </ButtonGroup>
    //   </div>
    // </div>
  );
}