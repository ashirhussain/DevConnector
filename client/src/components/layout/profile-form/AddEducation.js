import React, { Fragment,useState } from 'react'
import { connect } from 'react-redux';
import {addEducation} from '../../../actions/profile';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router';
import{Link} from 'react-router-dom'



const AddEducation = ({addEducation,history}) => {
    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''

    })
    const [disableState,setdisableState]=useState(false);
    const {school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description}=formData;
    const onchange=e=>{
        
        setFormData({...formData, [e.target.name]:e.target.value})
       
    }
    return (
        <Fragment>
             <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      
      <form className="form" onSubmit={(e)=>{e.preventDefault();addEducation(formData,history)}}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            required
            onChange={e=>onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            required
            onChange={e=>onchange(e)}

          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy"value={fieldofstudy} onChange={e=>onchange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e=>onchange(e)}/>
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" checked={current} name="current" value={current} onChange={e=>{
setFormData({...formData,current:!current})
setdisableState(!disableState)
            }}/> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled={disableState?'disabled':''} value={to} onChange={e=>onchange(e)}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e=>onchange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

AddEducation.propTypes={
addEducation:PropTypes.func.isRequired,
}
export default connect(null,{addEducation})(withRouter(AddEducation));
