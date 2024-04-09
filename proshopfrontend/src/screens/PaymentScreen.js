import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, ListGroup, Button, Card, Form, Col } from "react-bootstrap";
import { register } from '../actions/userActions'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from "../components/FormContainer.js";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CheckoutSteps from '../components/CheckoutSteps.js'

function PaymentScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const cart = useSelector(state => state.cartDetail)
    const { shippingAddress } = cart

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen