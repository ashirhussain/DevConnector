import axios from 'axios';
import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE, CLEAR_PROFILE,ACCOUNT_DELETED,GET_PROFILES,GET_REPOS} from './types';
import {setAlert} from './alert';   
export const getprofile=()=>async dispatch=>{

try {
    const res=await axios.get('/api/profile/me');
// console.log(res.data);
dispatch({
    type:GET_PROFILE,
    payload:res.data
})

} catch (error) {
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
    })
}

}
//get all profiles
export const getprofiles=()=>async dispatch=>{
    try {
        const res=await axios.get('/api/profile')
        // console.log(res.data)
        dispatch({type:GET_PROFILES,
        payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//get profile by id

export const getProfileById=(userId)=>async dispatch=>{
    try {
        const res=await axios.get(`/api/profile/user/${userId}`)
        console.log(res.data);
        dispatch({type:GET_PROFILE,payload:res.data})
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//get github repos
export const getGitHubRepos=(username)=>async dispatch=>{
    try {
        const res=await axios.get(`/api/profile/github/${username}`)
        dispatch({type:GET_REPOS,payload:res.data})
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
export const createProfile=(formData,history,edit=false)=>async dispatch=>{
    // console.log("create called")
try {
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const res= await axios.post('/api/profile',formData,config)
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
    dispatch(setAlert(edit?'profile updated':'profile created','success'))
    if(!edit){
        console.log("history"+history);
      history.push('/dashboard')  
    }
} catch (error) {
    const errors=error.response.data.errors;
    if(errors){
        // console.log(errors)
        errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
    }
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
    })
}
}
export const addExperience=(formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res= await axios.put('/api/profile/experience',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('experience added','success'))
        
            console.log("history"+history);
          history.push('/dashboard')  
        
    } catch (error) {
        const errors=error.response.data.errors;
        if(errors){
            // console.log(errors)
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
export const addEducation=(formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res= await axios.put('/api/profile/education',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('education added','success'))
        
            console.log("history"+history);
          history.push('/dashboard')  
        
    } catch (error) {
        const errors=error.response.data.errors;
        if(errors){
            // console.log(errors)
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
export const deleteEducation =(id)=>async dispatch=>{
try {
    const res=await axios.delete(`/api/profile/education/${id}`)
    dispatch({
        type:UPDATE_PROFILE,
        payload:res.data
    })
    dispatch(setAlert('Education deleted','success'))
    
} catch (error) {
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
    })
}
}
export const deleteExperience =(id)=>async dispatch=>{
    try {
        const res=await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience deleted','success'))
        
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
    }


   export const deleteAccount=()=>async dispatch=>{
        if(window.confirm('Are you sure you want to delete account')){
            try {
                await axios.delete('/api/profile')
    
                dispatch({
                    type:CLEAR_PROFILE
                })
                dispatch({type:ACCOUNT_DELETED})
        dispatch(setAlert('Account,profile,posts deleted','success'))
        

            } catch (error) {
                dispatch({
                    type:PROFILE_ERROR,
                    payload:{msg:error.response.statusText,status:error.response.status}
                })
            }
        }
    }