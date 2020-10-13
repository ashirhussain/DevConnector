import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import {deleteEducation} from '../../actions/profile';
import { connect } from "react-redux";

const Education = ({ education ,deleteEducation}) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment>-{" "}
        {edu.to === null ? "Now" : <Moment format="YY/MM/DD">{edu.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={()=>deleteEducation()}>Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2>Education</h2>
      <table>
        <thead>
          <td>School</td>
          <td>Degree</td>
          <td>Year</td>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.object.isRequired,
deleteEducation:PropTypes.func.isRequired,
};

export default connect(null,{deleteEducation})(Education);
