import {ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST, CLEAR_ERROR,
    PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_FAIL,NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_RESET,
    ADMIN_PRODUCT_FAIL,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_REQUEST,
    ADMIN_NEW_PRODUCT_FAIL, ADMIN_NEW_PRODUCT_REQUEST, ADMIN_NEW_PRODUCT_SUCCESS,ADMIN_NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS
} from '../constants/productConstants'

export const productReducer=(state={products:[]}, action)=>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return{
                loading:true,
                products:[]
            };
        case ALL_PRODUCT_SUCCESS:
        
            return{
                loading:false,
                products:action.payload.data.products,
                productsCount:action.payload.data.productCount,
                resultPerPage:action.payload.data.resultPerPage,
                filterProductsLength:action.payload.data.filterProductsLength

            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload

            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload

            };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
    
        default:

            return state
    }

}

//add new product admin
export const newProductReducer=(state={product:{}}, action)=>{
    switch (action.type) {

        case ADMIN_NEW_PRODUCT_REQUEST:

            return{
                loading:true,
                ...state
            };
        case ADMIN_NEW_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                success:action.payload.success,
                product:action.payload.product

            };
        case ADMIN_NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload

            };
            case ADMIN_NEW_PRODUCT_RESET:
                return{
                    ...state,
                    loading:false,
                    success:false
    
                };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
    
        default:

            return state
    }

}
export const modifyProductReducer=(state={}, action)=>{
    switch (action.type) {

        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return{
                loading:true,
                ...state
            };
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,

                isDeleted:action.payload

            };
        case UPDATE_PRODUCT_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    isUpdated:action.payload
                };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload

            };
            case DELETE_PRODUCT_RESET:
            
                return{
                    ...state,
                    isDeleted:false,
    
                };
            case UPDATE_PRODUCT_RESET:
            
                    return{
                        ...state,
                        isUpdated:false,
        
                    };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
    
        default:

            return state
    }

}
export const productDetailReducer=(state={product:{}}, action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading:true,
                ...state
            };
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading:false,
                product:action.payload.data.product

            };
        case PRODUCT_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload

            };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
    
        default:

            return state
    }

}

export const newReviewReducer=(state={}, action)=>{
    switch (action.type) {

        case NEW_REVIEW_REQUEST:

            return{
                loading:true,
                ...state
            };
        case NEW_REVIEW_SUCCESS:
            return{
                ...state,
                loading:false,

                success:action.payload

            };
        case NEW_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload

            };
            case NEW_REVIEW_RESET:
                return{
                    ...state,
                    loading:false,
                    success:false
    
                };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
    
        default:

            return state
    }

}



