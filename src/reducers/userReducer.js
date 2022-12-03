import {LOGIN_SUCCESS,LOGIN_REQUEST,LOGIN_FAIL,CLEAR_ERROR,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,REGISTER_USER_FAIL,
    LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST  , UPDATE_PROFILE_RESET,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_RESET,
    FROGET_PASSWORD_FAIL,FROGET_PASSWORD_REQUEST,FROGET_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,RESET_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS,
    

} from '../constants/userConstants'



export const userReducer=(state={user:{}},action)=>{

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading:true,
                isAuthenciate:false,
                isAdmin:false
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                
                loading:false,
                isAuthenciate:true,
                user:action.payload,
                isAdmin: action.payload.role==='admin'?true:false
                };
        case LOGOUT_SUCCESS:
            return{
                loading:false,
                isAuthenciate:false,
                isAdmin:false,
                user:null
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenciate:false,
                user:null,
                error:action.payload,
                isAdmin:false
                };
        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenciate:false,
                user:null,
                error:action.payload ,
                isAdmin:false
            };
        case LOGOUT_FAIL:
            return{
                loading:false,
                ...state,
                error:action.payload
            }
    
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
                };   
    
        default:
            return state
    }

}


export const profileReducer=(state={},action)=>{

    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        
            return{
                ...state,
                loading:true
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            console.log("login acces")
            return{
                loading:false,
                isUpdated:action.payload
                };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                isUpdated:false
            }
       
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
      
            return{
                ...state,
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

export const forgetPasswordReducer=(state={},action)=>{

    switch (action.type) {
        case FROGET_PASSWORD_REQUEST :
        case RESET_PASSWORD_REQUEST:
        
            return{
                ...state,
                loading:true,
                error:null
            };
        case FROGET_PASSWORD_SUCCESS:
            console.log("login acces")
            return{
                loading:false,
                message:action.payload
                };

        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                message:action.payload
            }
      
        case FROGET_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
      
            return{
                ...state,
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