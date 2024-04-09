import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { register } from '../actions/userActions'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from "../components/FormContainer.js";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CheckoutSteps from '../components/CheckoutSteps.js'


function ShippingScreen() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cartDetail)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter address'
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter city'
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter postal code'
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter country'
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen