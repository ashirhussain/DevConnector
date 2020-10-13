import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProfileById } from "../../../actions/profile";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
// import auth from "../../../reducers/auth";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileBio from "./ProfileBio";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithubRepos from './ProfileGithubRepos';


const Profile = ({ getProfileById, profile, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  // console.log("profile",profile?.user)
  return (
    <Fragment>
      {Profile === null || profile.isloading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Go Back
          </Link>
          {auth.isAuthenticated &&
            profile.isloading === false &&
            auth.user.user._id === profile.profile.user && (
              <Link to="/edit-profile">Edit Profile</Link>
            )}
          <div className="profile-grid my-1">
            {console.log(profile)}
            <ProfileTop profile={profile} />
            <ProfileBio profile={profile} />
            <div>
              <h2>Experience</h2>
              {profile.profile.experience.length > 0 ? (
                <Fragment>
                  {profile.profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Yet</h4>
              )}
            </div>
            <div>
              <h2>Education</h2>
              {profile.profile.education.length > 0 ? (
                <Fragment>
                  {profile.profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education</h4>
              )}
            </div>
            {
              profile.profile.githubusername&&(<ProfileGithubRepos username={profile.profile.githubusername}/>)
            }
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
