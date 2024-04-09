import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form, Table } from "react-bootstrap";
import { register } from '../actions/userActions'
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants.js'
import { listMyOrders } from '../actions/orderAction.js'
import { LinkContainer } from 'react-router-bootstrap'
function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const OrderListMy = useSelector(state => state.OrderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = OrderListMy

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success]);


    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmpassword) {
            setMessage('Password do not match')
        }
        else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')

        }
    }


    return (
        <Row>
            <Col lg={4}>
                <h1>User Profile</h1>
                <FormContainer>

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
                            <Form.Control type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password'
                                placeholder='Confirm Password'
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                </FormContainer >

            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>

        </Row>
    )
}

export default ProfileScreen