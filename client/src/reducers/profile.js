import {GET_PROFILE,PROFILE_ERROR, CLEAR_PROFILE,UPDATE_PROFILE,GET_PROFILES,GET_REPOS} from '../actions/types'

const initialstate={
    profile:null,
    profiles:[],
    repos:[],
    isloading:true,
    error:{}
}

export default function(state=initialstate,action){
    const {type,payload}=action;
    switch(type){
case GET_PROFILE:
    case UPDATE_PROFILE:
    return{
        ...state,
        profile:payload,
        isloading:false

    }
    case GET_REPOS:
        return{
            ...state,
            repos:payload,
            isloading:false
        }
        case GET_PROFILES:
            return{
                ...state,
                profiles:payload,
                isloading:false
            }
    case CLEAR_PROFILE:
        return{
            ...state,
            profile:null,
            profiles:[],
            repos:[],
            isloading:false
        }
    case PROFILE_ERROR:
        return {
            ...state,
            error:payload,
            isloading:false
        }
        default:
            return state;
    }
}