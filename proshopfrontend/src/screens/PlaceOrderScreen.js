import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { login } from '../actions/userActions'
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CheckoutSteps from '../components/CheckoutSteps.js'
import { createOrder } from '../actions/orderAction.js'
import { ORDER_CREATE_RESET } from '../constants/orderConstants.js'

function PlaceOrderScreen() {

  const orderCreate = useSelector(state => state.OrderCreate)
  const { order, error, success } = orderCreate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cartDetail)

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  cart.shippingPrice = Number((cart.itemsPrice > 100 ? 0 : 2).toFixed(2));
  cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  if (!cart.paymentMethod) {
    navigate('/payment')
  }

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [success, navigate, dispatch, order])

  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      shippingPrice: cart.shippingPrice
    }))
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address},  {cart.shippingAddress.city}
                {'  '}
                {cart.shippingAddress.postalCode},
                {'  '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? <Message variant='info'>
                Your cart is empty
              </Message> : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>

          </ListGroup>

        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>


              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen