import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileExperience = ({experience:{company,location,from ,to,current,title,description}}) => {
    return (
    // <div>{company}</div>
        <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        <div>
          <h3 className="text-dark">{company}</h3>
    <p><Moment format="YYYY/MM/DD">{from}</Moment> - {current?<span>Now</span>:<Moment format="YYYY/MM/DD">{to}</Moment>}</p>
    <p><strong>Position: </strong>{title}</p>
          <p>
            <strong>Description: </strong>
            {description}
          </p>
        </div>
      </div>
    )
}

ProfileExperience.propTypes = {
experience:PropTypes.object.isRequired,
}

export default ProfileExperience
