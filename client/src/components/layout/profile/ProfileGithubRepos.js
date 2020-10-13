import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {getGitHubRepos} from '../../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../Spinner'

const ProfileGithubRepos = ({username,repos,getGitHubRepos}) => {
    useEffect(()=>{
        getGitHubRepos(username)
    },[getGitHubRepos])
    return (
        <div>
           <h2>Git hub Repos</h2>
           {repos===null?<Spinner/>:(repos.map((repo)=>(
               <div key={repo._id}>
                   <div>
                       <h4>
           <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>{repo.name}</a>
                       </h4>
           <p>{repo.description}</p>
                   </div>
                   <div>
                       <ul>
           <li>stars:{repo.stargazers_count}</li>
           <li>watchers:{repo.watchers_count}</li>
           <li>forks:{repo.forks_count}</li>
                       </ul>
                   </div>
               </div>
           )))}
        </div>
    )
}

ProfileGithubRepos.propTypes = {
repos:PropTypes.array.isRequired,
username:PropTypes.string.isRequired,
getGitHubRepos:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    repos:state.profile.repos
})
export default connect(mapStateToProps,{getGitHubRepos})(ProfileGithubRepos);
