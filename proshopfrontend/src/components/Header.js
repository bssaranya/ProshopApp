import React from "react";
import { Nav, Navbar, Container, NavDropdown, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from '../actions/cartActions.js'
import { logout } from '../actions/userActions.js'
import SearchBox from './SearchBox'

function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cart_detail = useSelector(state => state.cartDetail)
  const { cartDetail } = cart_detail

  // const location = useLocation();
  // const isCartRoute = location.pathname.startsWith('/cart');

  // const cart_detail2 = cart_detail.cartItems

  // const productValues = cart_detail2.map(item => item.product);

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to={"/"}>
          <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        <SearchBox />
        <Nav className="ml-auto">
          <LinkContainer to={"/cart"}>
            {/* <LinkContainer to={userInfo ? `/cart/${productValues[0]}` : "/cart"}> */}
            <Nav.Link>
              <i className="fas fa-shopping-cart"></i>Cart
            </Nav.Link>
          </LinkContainer>

          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
            </LinkContainer>
          )}



        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
