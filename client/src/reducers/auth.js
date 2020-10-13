import {REGISTER_SUCCESS,REGISTER_FAILED,LOAD_USER,AUTH_ERR,LOGIN_SUCESS,LOGIN_FAILED, LOG_OUT,ACCOUNT_DELETED} from '.././actions/types';

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isloading:true,
    user:null
}
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      case LOGIN_SUCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        payload,
        isAuthenticated: true,
        isloading: false,
      };

    case REGISTER_FAILED:
      case AUTH_ERR:
        case LOGIN_FAILED:
          case LOG_OUT:
            case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isloading: false,
        token: null,
      };

      case LOAD_USER:
      return{  
      ...state,
      isAuthenticated:true,
      isloading:false,
      user:payload
      }
    default:
      return state;
  }
}