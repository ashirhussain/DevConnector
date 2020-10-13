import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getpost } from "../../../actions/post";

const Post = ({ getpost, post, match }) => {
  useEffect(() => {
    getpost(match.params.id);
  }, [getpost,match.params.id]);
  return <div>
    {console.log(post)}
  </div>;
};

const mapStateToProps=state=>({
post:state.post
})
export default connect(mapStateToProps, { getpost })(Post);
