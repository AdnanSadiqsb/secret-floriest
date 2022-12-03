import axios from 'axios'
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST, CLEAR_ERROR,
    PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_FAIL,NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS,
    ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS,
    ADMIN_NEW_PRODUCT_FAIL, ADMIN_NEW_PRODUCT_REQUEST, ADMIN_NEW_PRODUCT_SUCCESS
,    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_SUCCESS


} from '../constants/productConstants'
//new ne wproduct --Admin
export const createProduct=(productData)=>async (dispatch)=>{
    try{
        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            }
        dispatch({type:ADMIN_NEW_PRODUCT_REQUEST})
        const {data}=await axios.post(`http://localhost:4000/api/v1/admin/products/new`, productData, config)
        dispatch({
            type:ADMIN_NEW_PRODUCT_SUCCESS,
            payload:data
        })

        
    } catch (error) {
        console.log(error)
        dispatch({

            type:ADMIN_NEW_PRODUCT_FAIL,
            payload:error.response.data.message
        })
        
    }
}
//update product
export const updateProduct=(id,productData)=>async (dispatch)=>{
    try{
        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            }
        dispatch({type:UPDATE_PRODUCT_REQUEST})
        const {data}=await axios.put(`http://localhost:4000/api/v1/admin/products/${id}`, productData, config)
        console.log("product uopdated success fuly")
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success
        })

        
    } catch (error) {
        console.log(error)
        dispatch({

            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
        
    }
}
export const getProduct=(keyWord="",currentPage=1, price=[0,25000],category, rating=0)=>async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST})
        let link
        if(category)
        {
            link=`http://localhost:4000/api/v1/products?keyword=${keyWord}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&total_rating[gte]=${rating}`

        }
        else{
            link=`http://localhost:4000/api/v1/products?keyword=${keyWord}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&total_rating[gte]=${rating}`

        }
        console.log(link)
      

        const data=await axios.get(link)
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })

        
    } catch (error) {
        console.log(error)
        dispatch({

            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
        
    }
}
// admin get prodyuts
export const getProductAdmin=()=>async (dispatch)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_REQUEST})
       const {data}= await axios.get('http://localhost:4000/api/v1/admin/products',{ withCredentials: true})
            dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products
        })

        
    } catch (error) {
        dispatch({  

            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.message
        })
        
    }
}
//update Product


// admin delete prodyuts
export const deleteProduct=(id)=>async (dispatch)=>{
    try{
        dispatch({type:DELETE_PRODUCT_REQUEST})
       const {data}= await axios.delete(`http://localhost:4000/api/v1/admin/products/${id}`,{ withCredentials: true})
            dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success
        })

        
    } catch (error) {
        dispatch({  

            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
        
    }
}
export const getProductDetilas=(id)=>async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const data=await axios.get(`http://localhost:4000/api/v1/product/${id}`)
        console.log(data)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })

        
    } catch (error) {
        console.log(error)
        dispatch({

            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
        
    }
}
//new review
export const newReview=(reviewData)=>async (dispatch)=>{
    try{
        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            }
        dispatch({type:NEW_REVIEW_REQUEST})
        const {data}=await axios.put(`http://localhost:4000/api/v1/review`, reviewData, config)
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success
        })

        
    } catch (error) {
        console.log(error)
        dispatch({

            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
        
    }
}

// cleaning the errors
export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERROR})

}

