import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import {deleteExperience} from '../../actions/profile'
import { connect } from "react-redux";

const Experience = ({ experience,deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{" "}
        {exp.to === null ? "Now" : <Moment format="YY/MM/DD">{exp.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={()=>deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2>Experience</h2>
      <table>
        <thead>
          <td>Company</td>
          <td>Title</td>
          <td>Year</td>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience:PropTypes.func.isRequired,
};

export default connect(null,{deleteExperience})(Experience);
