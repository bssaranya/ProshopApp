import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { ProductListReducer, ProductDetailReducer, productReviewCreateReducer, productTopRatedReducer } from './reducers/productReducers'
import { CartAddReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { OrderCreateReducer, OrderDetailsReducer, OrderPayReducer, OrderListMyReducer } from './reducers/orderReducers'



const reducer = combineReducers({
    productList: ProductListReducer,
    productDetail: ProductDetailReducer,
    cartDetail: CartAddReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    OrderCreate: OrderCreateReducer,
    OrderDetails: OrderDetailsReducer,
    OrderPay: OrderPayReducer,
    OrderListMy: OrderListMyReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cartDetail: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;






