import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getprofiles } from "../../../actions/profile";
import PropTypes from "prop-types";
import ProfileItems from "./ProfileItems";
import Spinner from "../../layout/Spinner";

const Profiles = ({ getprofiles, profile: { profiles, isloading } }) => {
  useEffect(() => {
    getprofiles();
  }, [getprofiles]);
  return (
    <Fragment>
      {isloading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Developer</h1>
          <p>Browse and connect with developers</p>
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileItems key={profile._id} profile={profile} />
            // <h1>psldkvvs</h1>
            ))
          ) : (
            <h4>No Profiles Found</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
Profiles.protoTypes = {
  getprofiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getprofiles })(Profiles);
