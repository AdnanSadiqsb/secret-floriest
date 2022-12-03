import React, { Fragment } from 'react'
import './confirmOrder.css'
import CheckoutSteps from './CheckoutSteps'
import MeatData from '../layout/MeatData'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

function ConfirmOrder() {
    const navigate= useNavigate()
    const {shippingInfo, cartItems} =useSelector((state)=>state.cart)
    const {user}= useSelector(state=>state.user)
    console.log(cartItems)
    const subtotal=cartItems.reduce(
        (acc,item)=>acc + item.quantity*item.price,0
    ) 
    const ShippingCharges=  subtotal>1000?0:200
    const tax= subtotal*0.18

    const totalPrice=subtotal+ShippingCharges+tax
    const address=`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`

    const proceedToPayment=()=>{
        const data={
            subtotal,
            ShippingCharges,
            tax,
            totalPrice,


        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/process/payment')

    }
  return (
    <Fragment>
        <MeatData title={'confirm order'}/>
        <CheckoutSteps activeSteps={1}></CheckoutSteps>
        <div className="confirm-order-section">
            <div>
                <div className="confirmShippingArea">
                    <h3>Shipping Info</h3>
                    <div className="shippingInfoBox">
                        <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>phone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>


                    </div>
                </div>
                <div className="confirmCartItems">
                    <h3>Your cart Items</h3>
                    <div className="confirmCartItemConatiner">
                        {
                            cartItems&& cartItems.map((item)=>(
                                <div key={item.product}>
                                    <img src={item.image.url} alt="" />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    {"   "}
                                    <span>{item.quantity} X {item.price}= {"  "} <b>RS:{item.price*item.quantity}</b></span>



                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className="orderSummry">
                    <h3>order Summary</h3>
                    <div>
                        <div>
                            <p>subtotal:</p>
                            <span>Rs:{subtotal}</span>
                        </div>
                        <div>
                            <p>shipping charges:</p>
                            <span>Rs:{ShippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>Rs:{tax}</span>
                        </div>
                        <div className="orderSummaryToal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>PS:{totalPrice}</span>
                        </div>
                        <button className='btn-proceesToPay' onClick={proceedToPayment} >Proceed To Payment</button>


                    </div>
                </div>
            </div>

        </div>


      
    </Fragment>
  )
}

export default ConfirmOrder
