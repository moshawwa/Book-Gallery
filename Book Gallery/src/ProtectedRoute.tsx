import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./store/store";
import { AiFillControl } from "react-icons/ai";

const ProtectedRoute = () => {
  const isAuth = useAppSelector((state) => state.isAuth);
  if (isAuth) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="HeadarDashboard">
              <nav
                className="mt-2 navbar navbar-expand-lg "
                style={{ backgroundColor: "#FFCF7F" }}
              >
                <div className="container-fluid">
                  <a className="navbar-brand" href="#">
                    <AiFillControl size={40} />
                    Control Panel
                  </a>
                  <button
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
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <NavLink end to={"/Dashboard"} className="nav-link ">
                          Home
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          end
                          to={"/Dashboard/Book/AddBook"}
                          className="nav-link "
                        >
                          Add Book
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          end
                          to={"/Dashboard/Book/AddCategory"}
                          className="nav-link "
                        >
                          Add Category
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          end
                          to={"/Dashboard/Book/AddAuthor"}
                          className="nav-link "
                        >
                          Add Author
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else return <Navigate to={"/Login"} replace />;
};

export default ProtectedRoute;
