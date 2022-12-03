import React from 'react'
import { Fragment } from 'react'
import './cart.css'
import CartItems from './CartItems'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import {addItemsToCart, getCartItems, removeItemFromCart, getShippingInfo} from '../../actions/cartAction'
import RemoveShoppingCartIcon  from '@material-ui/icons/RemoveShoppingCart'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Cart() {
    
    const navigate=useNavigate()
    const [grossTotal, setGrossTotal]=useState(0)
    const dispatch=useDispatch()
    const {isAuthenciate} =useSelector(state=>state.user)

    const {cartItems}= useSelector((state)=>state.cart)
    const claculateGrossTota=()=>{
        var total=0
        var itemPrice=0
        cartItems.forEach(item => {
            itemPrice=item.price*item.quantity
            total=itemPrice+total
            
        });
        setGrossTotal(total)
    }
    useEffect(()=>{
        dispatch(getCartItems())
        
    },[dispatch])
    useEffect(()=>{
        
        claculateGrossTota()
    },[cartItems])

    const increaseQuantity=(id,quantity,stock)=>
    {
        const newQuantity=quantity+1
        if(stock<=quantity)
        {
            return
        }
        dispatch(addItemsToCart(id,newQuantity))

    }
    const decreaseQuantity=(id,quantity)=>
    {
        const newQuantity=quantity-1
        if(quantity<=1)
        {
            return
        }
        dispatch(addItemsToCart(id,newQuantity))

    }
    const deleteCartItem=(id)=>{
        dispatch(removeItemFromCart(id))
    }

    const checkOutHandler=()=>{
        if(isAuthenciate)
        {
            dispatch(getShippingInfo())

            navigate('/shipping')
        }
        else{
            navigate('/login')
        }
        // navigate('/login?redirect=/shipping')
    }

  return (
    <Fragment>
        {cartItems.length===0 ?
        <div className="emptyCart">
                <RemoveShoppingCartIcon></RemoveShoppingCartIcon>
                <h5>Please Add some thing To Cart to show here</h5>
                <Link to={'/products'}>go to Products</Link>
              </div>
             
        :    <Fragment>
        <div className="cartPage">
          <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
          </div>
          {
              cartItems && cartItems.map((item, index)=>(
            
                  <div key={index} className="cartConatiner">
                    
                  <CartItems  item={item} deleteCartItem={deleteCartItem} key={item.product} />
                  <div className="cartInput">
                      <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                      <input type="number" value={item.quantity} name="quantity" readOnly />
                      <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                  </div>
                  <div className="cartSubTotal">
                      {`${item.price*item.quantity}`}
                  </div>
      
      
                 
              </div>
  
              ))
          }
          
  
          <div className="grossProfit">
              <div></div>
              <div className="grossProfitBox">
                    <p>Gross Total</p> 
                     <p>{`RS: ${grossTotal}`}</p>
              </div>
          </div>
          <div className='checkOutBox'>
  
              <button className='btn-more' onClick={checkOutHandler} >Check Out</button>
          </div>
        </div>
      </Fragment>    
    }
    </Fragment>

  )
}

export default Cart
