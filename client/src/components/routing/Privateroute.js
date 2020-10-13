import React from 'react'
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'


const Privateroute = ({component:Component,auth:{isAuthenticated,isloading},...rest}) =>
(
    <Route {...rest} render={props=>!isAuthenticated&&isloading?<Redirect 
    to="/login"/>:<Component {...props}/>} /> 
)
const mapStateToProps=state=>({
    auth:state.auth
    })

Privateroute.propTypes={
    auth:PropTypes.object.isRequired,
    component:PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Privateroute)
