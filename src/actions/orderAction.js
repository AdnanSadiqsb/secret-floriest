import {CRATE_ORDER_FAIL, CRATE_ORDER_REQUEST, CRATE_ORDER_SUCCESS, CLEAR_ERROR, GET_ORDER_SUCCESS , GET_ORDER_FAIL, GET_ORDER_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_REQUEST, ORDER_DETAIL_FAIL} from '../constants/orderContants'

import axios from 'axios'
// create new order

export const createOrder=(order)=>async(dispatch, getState)=>{
    try {
        dispatch({type:CRATE_ORDER_REQUEST})
        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            }
        const {data}=await axios.post('http://localhost:4000/api/v1/order/new',order,config);
        dispatch({type:CRATE_ORDER_SUCCESS, payload:data})
        
    } catch (error) {
        console.log(error)
        dispatch({
            type:CRATE_ORDER_FAIL,
            payload:error.response.message
        })
    }
}

// get my orders
export const myOrders=()=>async(dispatch)=>{
    try {
        dispatch({type:GET_ORDER_REQUEST})
        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            }
        const {data}=await axios.get('http://localhost:4000/api/v1/orders/me',config);
        dispatch({type:GET_ORDER_SUCCESS, payload:data.order})
        
    } catch (error) {
        console.log(error)
        dispatch({
            type:GET_ORDER_FAIL,
            payload:error.response.message
        })
    }
}

// get order Deatil
export const orderDetail=(id)=>async(dispatch)=>{
    try {
        console.log('hlo order')
        dispatch({type:ORDER_DETAIL_REQUEST})
        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            }
        const {data}=await axios.get(`http://localhost:4000/api/v1/admin/order/${id}`,config);
        dispatch({type:ORDER_DETAIL_SUCCESS, payload:data.order})
        console.log(data.order)
        
    } catch (error) {
        console.log(error)
        dispatch({
            type:ORDER_DETAIL_FAIL,
            payload:error.response.message
        })
    }
}




// cleaning the errors
export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERROR})

}