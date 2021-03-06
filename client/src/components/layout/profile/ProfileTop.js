import React from "react";
import PropTypes from "prop-types";
import profile from "../../../reducers/profile";

const ProfileTop = ({
  profile:{
      profile:{
          user:{name,avatar},
          status,
          company,
          location,
          website,
          social
      }
  }
}) => {
  return (
//   <div>{console.log(website)}</div>
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status}
        {company && <span> at {company}</span>}
      </p>
  <p>{location&&<span>{location}</span>}</p>
      <div className="icons my-1">
          {
              website&&(<a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>website
            </a>)
          }
        {
            social.twitter&&( <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
            twitter
          </a>)
        }
       {
           social.facebook&&(<a href={social.facebook} target="_blank" rel="noopener noreferrer">
           <i className="fab fa-facebook fa-2x"></i>
           facebook
         </a>)
       }
        {
            social.linkedin&&(<a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
            linkedin
          </a>)
        }
        {
            social.youtube&&(<a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
            youtube
          </a>)
        }
        {
            social.instagram&&(<a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
            instagram
          </a>)
        }
        
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired,
};

export default ProfileTop;
