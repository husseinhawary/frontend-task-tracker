import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import logo from "../assets/task-tracker-logo.png";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const isuserLoggedIn = authCtx.isLoggedIn;

  const userLogoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-3">
      <div className="container">
        <a className="navbar-brand" href="/">
          Logo
        </a>
        {/* <img src="../assets/task-tracker-logo.png" alt="Logo Corrupted"/> */}

        {/* <img src={logo} alt="Logo Corrupted"/> */}
        <div className="navbar-nav">
          {isuserLoggedIn && (
            <NavLink className="nav-link" to="/tasks">
              Tasks
            </NavLink>
          )}
          {!isuserLoggedIn && (
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          )}
          {!isuserLoggedIn && (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )}
          {isuserLoggedIn && (
            <button
              type="button"
              className="btn btn-light"
              onClick={userLogoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
