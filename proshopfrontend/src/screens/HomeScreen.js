import React from "react";
// import products from "../products.js";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel.js'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { listProducts } from '../actions/productActions.js'
import { useNavigate, useLocation } from "react-router-dom";


function HomeScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  // const keyword = history.location.search
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');

  const page_no = searchParams.get('page') || 1;

  console.log(keyword)
  useEffect(() => {
    dispatch(listProducts(keyword, page_no))
  }, [dispatch, keyword, page_no]);

  return (
    <div>

      {!keyword && <ProductCarousel />}

      <h1>Latest Products</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <div>
            <Row>
              {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
      }
    </div>
  );
}




export default HomeScreen;
