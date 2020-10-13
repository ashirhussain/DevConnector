import React,{useEffect, Fragment} from 'react'
import {connect} from 'react-redux';
import {getprofile} from '../../actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Dashboardactions from './Dashboardsctions';
import Experience from './Experience';
import Education from './Education';
import {deleteAccount} from '../../actions/profile';

const Dashboard = ({getprofile,auth:{isloading,isAuthenticatd,user},profile:{profile},deleteAccount}) => {
 useEffect(()=>{
     getprofile()
 },[])
 
//  console.log(isloading,profile)
    return (
        // <Spinner/>
        isloading&&profile===null ?<Spinner />:(<Fragment>
            <h1>Welcome</h1>
        <h4>{user&&user.user.name}</h4>
            {
                // console.log(profile)
                profile!==null ?
                <Fragment>
                    <Dashboardactions/>
                    <Experience experience={profile.experience}/>
                    <Education education={profile.education} />
                    <div>
                        <button className="btn btn-danger" onClick={()=>{deleteAccount()}}>Delete Account</button>
                    </div>
                </Fragment>:
                <Fragment>You have no profile yet
                <Link to="/create-profile">Create Profile</Link>
            </Fragment>
            }
            </Fragment>)
       )
}
const mapStateToProps=state=>({
auth:state.auth,
profile:state.profile

})

Dashboard.propTypes={
    getprofile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{getprofile,deleteAccount})(Dashboard);
