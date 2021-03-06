import React, { useState } from 'react'
import {addpost} from '../../../actions/post'
import { connect } from 'react-redux'
const PostForm = ({addpost}) => {
    const [text,setText] =useState('')
    return (
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form class="form my-1" onSubmit={(e)=>{
            e.preventDefault();
            addpost({text});
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            onChange={e=>setText(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

export default connect(null,{addpost})(PostForm);
