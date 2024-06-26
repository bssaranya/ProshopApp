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
import { getOrderDetails, payOrder } from '../actions/orderAction.js'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants.js'


function OrderScreen() {


  const { orderId } = useParams();
  const navigate = useNavigate();

  const OrderDetails = useSelector(state => state.OrderDetails)
  const { order, error, loading } = OrderDetails
  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const orderPay = useSelector(state => state.OrderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }

  // AZ2cT0M1cKh8T6gXh6ekDMWU8N8FjE_EzEvDnXSmXn95PXEW82Np5MJTaoSAfFWvYz_nDyymK6j4Rq5p
  const addPayPalScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    // script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AZ2cT0M1cKh8T6gXh6ekDMWU8N8FjE_EzEvDnXSmXn95PXEW82Np5MJTaoSAfFWvYz_nDyymK6j4Rq5p'

    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!order || successPay || order._id !== Number(orderId)) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId, successPay])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order: {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong> {order.user.name}</strong></p>
              <p> <strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></strong></p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address},  {order.shippingAddress.city}
                {'  '}
                {order.shippingAddress.postalCode},
                {'  '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ?
                < Message variant='success'> Delivered on {order.deliveredAt} </Message> :
                <Message variant='warning'>Not Delivered</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ?
                < Message variant='success'> Paid on {order.paidAt} </Message> :
                <Message variant='warning'>Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? <Message variant='info'>
                Order is empty
              </Message> : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )

}

export default OrderScreen