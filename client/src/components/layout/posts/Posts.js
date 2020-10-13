import React, { useEffect ,Fragment} from "react";
import { getposts } from "../../../actions/post";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import PostItem from "./PostItem";
import Postform from './Postform';
import PostForm from "./Postform";
const Posts = ({ getposts, post: { posts, isloading } }) => {
  useEffect(() => {
    getposts();
  }, [getposts]);
  return isloading ? (
    <Spinner />
  ) : (
    <Fragment>
        <h2>Posts</h2>
<PostForm/>
      {posts.map((post) => 
        (<PostItem key={post._id} post={post}/>)
      )}
    </Fragment>
  );
};
Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getposts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getposts })(Posts);
