import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions.js'
import { useParams, useNavigate, useLocation } from "react-router-dom";




function CartScreen() {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const qty = queryParams.get('qty') || 1; // Default to 1 if 'qty' is not present

  const cart = useSelector(state => state.cartDetail)
  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }

  }, [dispatch, id, qty])


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  // const checkoutHandler = () => {
  //   // navigate('/login?redirect=shipping')
  //   navigate('/shipping');

  // }
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const checkoutHandler = () => {
    if (userInfo) {
      // User is logged in, navigate to shipping
      navigate('/shipping');
    } else {
      // User is not logged in, navigate to login with redirect parameter
      navigate('/login', { state: { redirect: '/shipping' } });
    }
  };
  return (
    <>

      <Row>
        <Col md={8}>
          <h1> Shopping Cart </h1>
          {
            cartItems.length === 0 ? (
              <Message variant='info'>
                Your Cart is Empty
                <Link to='/'> Go Back </Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {
                  cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>

                        <Col md={2}>
                          ${item.price}
                        </Col>

                        <Col md={3}>
                          <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                            {
                              [...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))
                            }


                          </Form.Control>

                          <Col md={1}>
                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                              <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                        </Col>
                      </Row>
                    </ListGroup.Item>))}
              </ListGroup>
            )
          }
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>SubTotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items </h2>

                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
              </ListGroup>

              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}> Proceed to Checkout </Button>
              </ListGroup.Item>
            </Card>
          </Col>

        </Col>
      </Row>
    </>
  )
}

export default CartScreen