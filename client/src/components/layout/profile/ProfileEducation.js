import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileEducation = ({education:{school,degree,fieldofstudy,from ,to,current,description}}) => {
    return (
    // <div>{company}</div>
        <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Education</h2>
        <div>
          <h3 className="text-dark">{school}</h3>
    <p><Moment format="YYYY/MM/DD">{from}</Moment> - {current?<span>Now</span>:<Moment format="YYYY/MM/DD">{to}</Moment>}</p>
    <p><strong>Degree: </strong>{degree}</p>
          <p>
            <strong>Fieild of study: </strong>
            {fieldofstudy}
          </p>
          <p>
            <strong>Description: </strong>
            {description}
          </p>
        </div>
      </div>
    )
}

ProfileEducation.propTypes = {
education:PropTypes.object.isRequired,
}

export default ProfileEducation
