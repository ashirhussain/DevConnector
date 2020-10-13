import {GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST} from '../actions/types';
// import { Switch } from 'react-router';

const initialState={
    posts:[],
    post:null,
    isloading:true,
    error:{}
}
export default function(state=initialState,action){
const {type,payload}=action;
switch(type){
    case GET_POSTS:
        return{
            ...state,
            isloading:false,
            posts:payload

        }
        case GET_POST:
            return{
            ...state,
            isloading:false,
            post:payload
            }
        case POST_ERROR:
            return{
                ...state,
                isloading:false,
                error:payload
            }
            case UPDATE_LIKES:
                return{
                ...state,
                posts:state.posts.map(post=>post._id===payload.id?{...post,likes:payload.likes}:post),
                isloading:false
                
            }
            case DELETE_POST:
                return{
                    ...state,
                    posts:state.posts.filter(post=>post._id!==payload),
                    isloading:false
                }
            case ADD_POST:
                return{
                ...state,
                posts:[payload,...state],
                isloading:false
                }
            default:
                return state;

}


}