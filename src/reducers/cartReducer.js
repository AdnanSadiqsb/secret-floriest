import {ADD_TO_CART ,GET_CART_ITEMS,GET_SHIPPING_INFO, REMOVE_TO_CART, SAVE_SHIPPING_INFO} from '../constants/cartConstants'

export const cartReducer=(state={cartItems:[], shippingInfo:{}},action)=>{
    switch(action.type)
    {   
        case ADD_TO_CART:
            const item=action.payload
            console.log(state.cartItems)
            const isItemExist=state.cartItems.find(
                (i)=>i.product===item.product
            )
            if(isItemExist)
            {
                return{
                    ...state,
                    cartItems: state.cartItems.map((i)=>
                        
                        i.product===isItemExist.product ?item:i
                    )
                }

            }
            else{
                return{
                    ...state,
                    cartItems: [...state.cartItems,item],
                }
            }

            case GET_CART_ITEMS:
                return{
                    ...state,
                    cartItems:action.payload
            }
            case GET_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:action.payload
                }

            case REMOVE_TO_CART:
        
                return{
                    ...state,
                    cartItems:state.cartItems.filter((i)=>  i.product !== action.payload
                ),
                }
            case SAVE_SHIPPING_INFO:
                console.log(action.payload)
                return{
                    ...state,
                    shippingInfo:action.payload
                }
          
            default:
                return{
                    ...state
                }
            
        }
        
}