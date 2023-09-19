import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logOut } from "../../store/authSlice";

import { ImBooks } from "react-icons/im";

const Header = () => {
  const { isAuth, user } = useAppSelector((state) => state);
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggleNavBar((prevState) => !prevState);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#c9643e" }}
      >
        <div className="container-fluid">
          <NavLink to={"/"} className="navbar-brand">
            <ImBooks size={40} />
            Book Gallery
          </NavLink>
          <button
            onClick={handleToggle}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={
              toggleNavBar
                ? "collapse navbar-collapse justify-content-between show"
                : "collapse navbar-collapse justify-content-between"
            }
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              {isAuth && (
                <li className="nav-item">
                  <NavLink
                    to="/Dashboard"
                    className={({ isActive }) => {
                      return isActive ? "nav-link active" : "nav-link";
                    }}
                    aria-current="page"
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
            {isAuth == false ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    to="/Login"
                    className={({ isActive }) => {
                      return isActive ? "nav-link active" : "nav-link";
                    }}
                    aria-current="page"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Register"
                    className={({ isActive }) => {
                      return isActive ? "nav-link active" : "nav-link";
                    }}
                    aria-current="page"
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <span className="nav-link">Welcome, {user?.firstname}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => {
                      dispatch(logOut());
                      navigate("/", {
                        replace: true,
                      });
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
