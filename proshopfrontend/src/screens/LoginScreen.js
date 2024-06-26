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


function LoginScreen() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const redirect = location.search ? location.search.split('=')[1] : '/';

    //statr.userLogin -> store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin



    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
            dispatch(login(email, password));
        }
    }, [dispatch, email, password, userInfo, redirect]);


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen