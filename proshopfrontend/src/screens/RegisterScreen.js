import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { register } from '../actions/userActions'
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { useParams, useNavigate, useLocation } from "react-router-dom";


function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')


  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const redirect = location.search ? location.search.split('=')[1] : '/';

  //statr.userLogin -> store.js
  const userRegister = useSelector(state => state.userRegister)
  const { error, loading, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      dispatch(register(name, email, password));
    }
  }, [dispatch, name, email, password, userInfo, redirect]);


  const submitHandler = (e) => {
    e.preventDefault()
    if (password != confirmpassword) {
      setMessage('Password do not match')
    }
    else {
      dispatch(register(name, email, password))

    }
  }



  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control required type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control required type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control required type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control required type='password'
            placeholder='Confirm Password'
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Register</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >Sign In</Link>
        </Col>
      </Row>

    </FormContainer>


  )
}

export default RegisterScreen