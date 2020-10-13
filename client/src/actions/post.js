import axios from 'axios';
import {GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST, GET_POST}  from './types';
import {setAlert} from '../actions/alert';

export const getposts=()=>async dispatch=>{
    try {
        const res =await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

export const likeApost=(id)=>async dispatch=>{
    try {
        console.log("like a post action")
        const res =await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
export const unlikeApost=(id)=>async dispatch=>{
    try {
        const res =await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
export const deletepost=(id)=>async dispatch=>{
    try {
        await axios.delete(`/api/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            payload:id
        })
        dispatch(setAlert("post deleted" ,"success"))
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

export const addpost=(formData)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.post('/api/posts',formData,config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('post added' ,'success'))
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
export const getpost=(id)=>async dispatch=>{
try {
    const res=axios.get(`/api/post/${id}`)
    dispatch({
        type:GET_POST,
        payload:res.data
    })
} catch (error) {
    dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
    })
}
}