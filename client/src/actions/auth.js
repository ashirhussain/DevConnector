import axios from 'axios';
import{setAlert} from './alert'
import {CLEAR_PROFILE,REGISTER_SUCCESS,REGISTER_FAILED,LOAD_USER,AUTH_ERR, LOGIN_SUCESS, LOGIN_FAILED, LOG_OUT} from './types';
import {setTokenToHeader}from '../utils/setToken';



//action to load user 
export const loadUser=()=>async dispatch=>{
setTokenToHeader(localStorage.token);

try {
    const res=await axios.get('/api/auth');
    dispatch({
        type:LOAD_USER,
    payload:res.data})
} catch (error) {
    dispatch({type:AUTH_ERR})
}

}

//action to register a user
export const register=({name,email,password})=>async dispatch=>{

const config={
    headers:{
        'Content-Type':'application/json'
    }
};
const body=JSON.stringify({name,email,password});
// console.log(body+"slkdbsklbv")

try {
    const res= await axios.post('/api/users',body,config);
dispatch({
    type:REGISTER_SUCCESS,
    payload:res.data
})
dispatch(loadUser())
    
} catch (error) {
    const errors=error.response.data.errors;
    if(errors){
        // console.log(errors)
        errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
    }
    dispatch({type:REGISTER_FAILED})
}
}

export const login=(email,password)=>async dispatch=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=JSON.stringify({email,password});

    
    try {
        console.log("login run")
        const res=await axios.post('api/auth',body,config);
        dispatch({
            type:LOGIN_SUCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (error) {
        const errors=error.response.data.errors;
    if(errors){
        // console.log(errors)
        errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
    }
    dispatch({type:LOGIN_FAILED})
    }
}
export const logout=()=>dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    })
    dispatch({
        type:LOG_OUT
    })
}