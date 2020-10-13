import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import profile from "../../../reducers/profile";

const ProfileItems = ({ profile}) => {
    const {user:{_id,name,avatar},company,status,location,skills} =profile;
  // console.log("formfmormoabc"+profile)
  return (
    // <div>{console.log(profile.user.name)}</div>
    // //
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status}
          {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">view profile</Link>
        <ul>
            {skills.slice(0,4).map((skill,index)=>(
                <li key={index}>{skill}</li>
  ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItems.propTypes = {
  profile:PropTypes.object.isRequired,
};
export default ProfileItems;
