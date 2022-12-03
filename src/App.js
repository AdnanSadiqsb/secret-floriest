import Header from './components/layout/header/Header.js'
import Footer from './components/layout/footer/Footer.js'
import Home from './components/home/Home.js'
import ProductDetail from './components/product/ProductDetail'
import './App.css';
import Products from './components/product/Products.js'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import React from 'react';
import Search from './components/product/Search.js';
import LoginSignup from './components/user/LoginSignup.js';
import { loadUser} from './actions/userAction.js';
import {useDispatch} from 'react-redux'
import UserOptions from './components/layout/header/UserOptions'
import {useSelector} from 'react-redux'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile.js';
import UpdatePassword from './components/user/UpdatePassword.js';
import ForgetPassword from './components/user/ForgetPassword.js';
import ResetPassword from './components/user/ResetPassword.js';
import Cart from './components/cart/Cart.js';
import Shipping from './components/cart/Shipping.js';
import ConfirmOrder from './components/cart/ConfirmOrder.js';
import { useState } from 'react';
import Payment from './components/cart/Payment.js';
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Success from './components/cart/Success.js';
import MyOrder from './components/order/MyOrder.js';
import OrderDetails from './components/order/OrderDetails.js';
import Dashboard from './components/admin/Dashboard.js';
import ProductList from './components/admin/ProductList.js';
import NewProduct from './components/admin/NewProduct.js';
import UpdateProduct from './components/admin/UpdateProduct.js';
function App() {
  const dispatch=useDispatch()
  const {isAuthenciate, user, isAdmin} =useSelector(state=>state.user)
  const [stripeApiKey, setStripeApiKey]=useState('')
  console.log(isAdmin)
  async function getStripeApiKey()
  {
    console.log("request progress")
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      }
    const {data}= await axios.get('http://localhost:4000/api/v1/stripeapikey', config)
    setStripeApiKey(data.stripeApiKey)
   

  }
  React.useEffect(()=>{
    dispatch(loadUser())
    getStripeApiKey()

    
  },[dispatch])

  return (
    <Router>

      <Header/>
      {isAuthenciate && <UserOptions user={user} />}
      <Routes>

        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/product/:id' element={<ProductDetail/>}></Route>
        <Route exact path="/products" element={<Products/>}> </Route>
        <Route path="/products/:keyword" element={<Products/>}> </Route>
        <Route exact path='/search' element={<Search/>}></Route>
        <Route exact path='/login' element={<LoginSignup/>}></Route>
        {isAuthenciate && <Route exact path ='/account' element={<Profile/> }  ></Route>}

        {isAuthenciate && <Route exact path ='/me/update' element={<UpdateProfile/> }  ></Route>}
        {isAuthenciate && <Route exact path ='/password/update' element={<UpdatePassword/> }  ></Route>}
        {isAuthenciate && <Route exact path ='/shipping' element={<Shipping/> }  ></Route>}
        {isAuthenciate && <Route exact path ='/order/confirm' element={<ConfirmOrder/> }  ></Route>}
        {isAuthenciate && <Route exact path ='/success' element={<Success/> }  ></Route>}
        {isAuthenciate && <Route exact path ='/orders/me' element={<MyOrder/> }  ></Route>  } 
        {/* if not authenticate then redirect to login page*/}
        <Route exact path ='/orders/me'  element={isAuthenciate? <MyOrder/>:<LoginSignup/> }  ></Route> 
        <Route exact path ='/order/:id'  element={isAuthenciate? <OrderDetails/>:<LoginSignup/> }  ></Route> 

        
        {
          stripeApiKey &&(
            isAuthenciate && <Route exact path ='/process/payment' element={<Elements stripe={ loadStripe(stripeApiKey)}><Payment/></Elements> }  ></Route>

          )
        }


        <Route exact path ='/password/forget' element={<ForgetPassword/> }  ></Route>
        <Route exact path ='/password/reset/:token' element={<ResetPassword/> }  ></Route>
        <Route exact path ='/cart' element={<Cart/> }  ></Route>
        
        {isAuthenciate && isAdmin && <Route exact path ='/admin/dashboard' element={<Dashboard/>}  ></Route> }
        {isAuthenciate && isAdmin && <Route exact path ='/admin/products' element={<ProductList/>}  ></Route> }
        {isAuthenciate && isAdmin && <Route exact path ='/admin/product/new' element={<NewProduct/>}  ></Route> }
        {isAuthenciate && isAdmin && <Route exact path ='/admin/product/:id' element={<UpdateProduct/>}  ></Route> }


      </Routes>

      <Footer/>
      </Router>
  )
}

export default App;
