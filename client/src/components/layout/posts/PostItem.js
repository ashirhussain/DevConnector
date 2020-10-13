import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {likeApost,unlikeApost} from '../../../actions/post';
import {deletepost} from '../../../actions/post';
const PostItem = ({deletepost, likeApost,unlikeApost, auth,post:{ _id,text,name,avatar,user,likes,comments,date}}) => {
    return (
    <div>
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to="/profile">
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
          {
              text
          }
          </p>
           <p className="post-date">
        <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          <button onClick={e=>{console.log("like a post"); likeApost(_id)}} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>
        <span>{likes.length}</span>
          </button>
          <button onClick={e=>unlikeApost(_id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion <span className='comment-count'>
                {comments.length}
            </span>
          </Link>

    { !auth.loading&&user===auth.user.user._id&&(<button 
    onClick={e=>deletepost(_id)}
        type="button"
        className="btn btn-danger"><i className="fas fa-times"></i>
        Delete Post
      </button>)
}
          {/* {console.log(auth.user.user._id,"ashir hussain",user)} */}
        </div>
      </div>
      </div>
    
    )
}

const mapStateToProps=state=>({
    auth:state.auth
    
})

export default connect(mapStateToProps,{likeApost,unlikeApost,deletepost})(PostItem);
