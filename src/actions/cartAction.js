import {ADD_TO_CART,GET_SHIPPING_INFO ,GET_CART_ITEMS, REMOVE_TO_CART, SAVE_SHIPPING_INFO} from '../constants/cartConstants'

import Axios from 'axios'
// add to cart
export const addItemsToCart =(id,quantity)=>async(dispatch, getState)=>{
        const {data}= await Axios.get(`http://localhost:4000/api/v1/product/${id}`)
        dispatch({type:ADD_TO_CART,
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                stock:data.product.stock,
                image:data.product.images[0].url,
                quantity
            }
        })

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))




}
export const getCartItems =()=>async(dispatch)=>{
    
    
    dispatch({type:GET_CART_ITEMS,
        payload: localStorage.getItem('cartItems')
        ?
         JSON.parse(localStorage.getItem('cartItems'))
        :
        [],
    
    })

}



//remove from cart
export const removeItemFromCart=(id)=>async (dispatch,getState)=>{
    dispatch({
        type:REMOVE_TO_CART,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}
//get shipping data

export const getShippingInfo =()=>async(dispatch)=>{
    
    
    dispatch({type:GET_SHIPPING_INFO,
        payload: localStorage.getItem('shippingInfo')
        ?
         JSON.parse(localStorage.getItem('shippingInfo'))
        :
        {address:'', city:'', state:'', country:'',pinCode:'', phoneNo:''}
    
    })

}
//save shipping info

export const saveShippingInfo=(data)=>async (dispatch)=>{
    console.log(data)
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })
    localStorage.setItem('shippingInfo',JSON.stringify(data))

}