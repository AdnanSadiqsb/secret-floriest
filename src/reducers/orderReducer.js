import {CRATE_ORDER_FAIL, CRATE_ORDER_REQUEST, CRATE_ORDER_SUCCESS, CLEAR_ERROR, GET_ORDER_SUCCESS , GET_ORDER_FAIL, GET_ORDER_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_REQUEST, ORDER_DETAIL_FAIL} from '../constants/orderContants'

export const newOrderReuducer=(state={},action)=>{
    switch(action.type)
    {

        case CRATE_ORDER_REQUEST:
        return{
            ...state,
            loading:true

        }
        case CRATE_ORDER_SUCCESS:
            return{

                order:action.payload,
                loading:false
            }
        case CRATE_ORDER_FAIL:
            return{
                loading:false,
                error:action.payload
                }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }

        



        default:
            return state
    }
}



export const myOrdersReducer=(state={orders:[]},action)=>{
    switch(action.type)
    {

        case GET_ORDER_REQUEST:
        return{
            loading:true

        }
        case GET_ORDER_SUCCESS:
            return{

                orders:action.payload,
                loading:false
            }
        case GET_ORDER_FAIL:
            return{
                loading:false,
                error:action.payload
                }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }

        



        default:
            return state
    }
}

export const orderDetailReducer=(state={order:{}},action)=>{
    switch(action.type)
    {

        case ORDER_DETAIL_REQUEST:
        return{
            loading:true,
            order:action.payload

        }
        case ORDER_DETAIL_SUCCESS:
            return{

                order:action.payload,
                loading:false
            }
        case ORDER_DETAIL_FAIL:
            return{
                loading:false,
                error:action.payload
                }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }

        



        default:
            return state
    }
}