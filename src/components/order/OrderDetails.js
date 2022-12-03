import React from 'react'
import './orderDetail.css'
import MeatData from '../layout/MeatData'
import {orderDetail, clearErrors} from '../../actions/orderAction'
import {Link, useParams} from 'react-router-dom'
import Loader from '../layout/loader/Loader'
import {useAlert} from 'react-alert'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { Fragment } from 'react'
function OrderDetails() {
    const {id}= useParams()
    const alert= useAlert()
    const dispatch=useDispatch()
    const {order, error, loading} =useSelector((state)=>state.orderDetails)
    useEffect(()=>{
        dispatch(orderDetail(id))
        if(error)
        {
            alert.error(error)
            dispatch(clearErrors())
        }
    },[error, dispatch, id, alert])
  return (
    <Fragment>
        <MeatData title={`order detail ${id}` }/>
        {loading? <Loader/> :
       <Fragment>
       <div className="orderDetailPage">
           <div className="confirmShippingArea">
               <h5>Order # {order && order._id}</h5>
               <div className="shippingInfoBox">
                   <div>
                       <p>Name: </p>
                       {/* <span>{order && order.user.name}</span> */}
                   </div>
                   <div>
                       <p>Phone: </p>
                       <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                   </div>
                   <div>
                       <p>Address: </p>
                       <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}`}</span>
                   </div> 
               </div>
               <h5>Payment</h5>
               <div className='shippingInfoBox'>
                   <div>
                       <p className={order.paymentInfo && order.paymentInfo.status==='succeeded'?'greenColor':'redColor'}>
                           {order.paymentInfo && order.paymentInfo.status==='succeeded'?'PAID':'UNPAID'}</p>
                   </div>
                   <div>
                       <p>Amount :</p>
                       <span>{order.totalPrice && order.totalPrice}</span>
                   </div>


               </div>
               <h5>Order Status</h5>
               <div className='orderDetailBox'>
                   <div>
                       <p className={order.orderStatus && order.orderStatus==='Delivered'?'greenColor':'redColor'}>
                           {order.orderStatus && order.orderStatus}</p>
                   </div>
               </div>



           </div>
           <div className="confirmCartItems">
               <h3>Your cart Items</h3>
               <div className="confirmCartItemConatiner">
                   {
                       order.orderItems&& order.orderItems.map((item)=>(
                           <div key={item.product}>
                               <img src={item.image} alt="" />
                               <Link to={`/product/${item.product}`}>{item.name}</Link>
                               {"   "}
                               <span>{item.quantity} X {item.price}= {"  "} <b>RS:{item.price*item.quantity}</b></span>



                           </div>
                       ))
                   }
               </div>
           </div>
       </div>
   </Fragment>
        }

      
    </Fragment>
  )
}

export default OrderDetails
