import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileBio = ({profile:{
    profile:{
        skills,
        bio,
        user:{
            name
        }
    }
}}) => {
    return (

    // <div>{console.log(skills)}</div>
    <div className="profile-about bg-light p-2">
    {
        bio&&(
            <Fragment>
            <h2 className="text-primary">{name}'s Bio</h2>
        <p>
          {bio}
        </p>
        </Fragment>)
    }
          
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {skills.map((skill,index)=>(
                (<div key={index}>{skill}{' '}</div>)
            ))}
          </div>
        </div>
    )
}

ProfileBio.propTypes = {

}

export default ProfileBio
