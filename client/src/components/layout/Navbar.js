import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, isloading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <h1>
        <a href="!#" onClick={logout}>
          <i className="fas fa-code" />
          Logout
        </a>
      </h1>
    </ul>
  );
  const unAuthlinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/login"> Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <h1>
        <a href="!//#endregion">Devconnector</a>
      </h1>
      {
        //if logged in show logout otherwise login and register
        !isloading && (
          <Fragment>{isAuthenticated ? authLinks : unAuthlinks}</Fragment>
        )
      }
    </nav>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
