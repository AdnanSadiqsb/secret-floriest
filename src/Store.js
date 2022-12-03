import {combineReducers,applyMiddleware, compose} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productReducer,productDetailReducer, newReviewReducer, newProductReducer, modifyProductReducer } from './reducers/productReducer'
import { userReducer,profileReducer, forgetPasswordReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
import { myOrdersReducer, newOrderReuducer, orderDetailReducer } from './reducers/orderReducer'

const reducers = combineReducers({
     products:productReducer,
     productDetail:productDetailReducer,
     user:userReducer,
     profile:profileReducer,
     forgetPassword:forgetPasswordReducer,
     cart:cartReducer,
     newOrder:newOrderReuducer,
     myOrders:myOrdersReducer,
     orderDetails:orderDetailReducer,
     newReview:newReviewReducer,
     newProduct:newProductReducer,
     modifyProduct:modifyProductReducer

 })
let initialState={
    cart:{
        
        shippingInfo:localStorage.getItem('shippingInfo')?
        JSON.parse(localStorage.getItem('shippingInfo')):
        {address:'', city:'', state:'', country:'',pinCode:'', phoneNo:''},

        cartItems: localStorage.getItem('cartItems')
        ?
        JSON.parse(localStorage.getItem('cartItems'))
        :
        []

    }
}

const middleWare=[thunk]

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
   composeEnhancers = compose;
}
const store = configureStore(
        {reducer:reducers},
        initialState,
        composeEnhancers(
            applyMiddleware(middleWare)
        )
    );


export default store
