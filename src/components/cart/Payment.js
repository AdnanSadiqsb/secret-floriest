import React from 'react'
import { Fragment, useEffect, useRef } from 'react'
import {useAlert} from 'react-alert'
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import EventIcon from '@material-ui/icons/Event'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import MeatData from '../layout/MeatData'
import CheckoutSteps from './CheckoutSteps'
import {useDispatch, useSelector} from 'react-redux'
import './payment.css'
import {useNavigate} from 'react-router-dom'
import { clearErrors, createOrder} from '../../actions/orderAction'
function Payment() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const alert =useAlert()
    const stripe=useStripe()
    const elements=useElements()
    const payBtn= useRef(null)
    const orderInfo =JSON.parse(sessionStorage.getItem('orderInfo'))
    const {shippingInfo, cartItems} = useSelector(state=>state.cart)
    const {user} = useSelector(state=>state.user)
    const {error} =useSelector(state=>state.newOrder)
    const patymentData={
        //it recieve amount into pese so we * 100
        amount:Math.round(orderInfo.totalPrice*100)
    }
    
    const order={
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice

    }


    const submitHandler= async(e)=>{
        e.preventDefault();
        payBtn.current.disabled=true
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json"
                  },
                  withCredentials: true
                }

                const {data}= await axios.post('http://localhost:4000/api/v1/payment/process'
                ,patymentData,
                config
                )
                const client_secret=data.client_secret
                if(! stripe || ! elements) return
                const result= await stripe.confirmCardPayment(client_secret,{
                    payment_method:{
                        card:elements.getElement(CardNumberElement),
                        billing_details:{
                            name:user.name,
                            email:user.email,
                            address:{
                                line1:shippingInfo.address,
                                city:shippingInfo.city,
                                state:shippingInfo.state,
                                postal_code:shippingInfo.pinCode,
                                country:shippingInfo.country
                            }
                        }
                    }
                })

                if(result.error)
                {
                    payBtn.current.disabled=false;
                    alert.error(result.error.message)

                }
                else{
                    if(result.paymentIntent.status==='succeeded')
                    {
                        order.paymentInfo={
                            id:result.paymentIntent.id,
                            status:result.paymentIntent.status,


                        }
                        dispatch(createOrder(order))
                        navigate('/success')
                    }
                    else{
                        alert.error('some error accur while processing payment')
                    }
                }


            
        } catch (error) {
            payBtn.current.disabled=false
            alert.error(error.response.data.message)
            
            
        }

    }
    useEffect(()=>{
        if(error)
        {
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, error, alert])
    return (
    <Fragment>
      <MeatData title={'Payment'}></MeatData>
      <CheckoutSteps activeSteps={2}></CheckoutSteps>
      <div className="paymentInfo-cont">
        <form action="" onSubmit={submitHandler} className='paymentForm'>
            <h3>Card Info</h3>
            <div>
                <CreditCardIcon/>
                <CardNumberElement className='paymentInfo'></CardNumberElement>

            </div>
            <div>
                <EventIcon/>
                <CardExpiryElement className='paymentInfo'></CardExpiryElement>
                
            </div>
            <div>
                <VpnKeyIcon/>
                <CardCvcElement className='paymentInfo'></CardCvcElement>
                
            </div>
            <input type="submit"  value={`PAY     ${orderInfo && `Rs: ${orderInfo.totalPrice}`} `} ref={payBtn} className='payBtn'/>



        </form>
      </div>
    </Fragment>
  )
}

export default Payment
