import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { loginUser } from "../store/authSlice";
import { User } from "../types/User";
import axios from "axios";
import { useState } from "react";

import AuthService from "../services/AuthService";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password is required, at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleLogin = (data: FormData) => {
    // Axios Call

    AuthService.LoginUser(data.email, data.password)
      .then(({ data }) => {
        const user: User = {
          email: data.email,
          firstname: data.firstName,
          lastname: data.lastName,
        };

        localStorage.setItem("access_token", data.token);

        dispatch(loginUser(user));
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message);
        }
      });
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <h5 className="card-title">Login with your email address</h5>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-4">
                  <label className="form-label" htmlFor="email">
                    Email :
                  </label>
                  <input
                    {...register("email")}
                    className="form-control"
                    type="email"
                    id="email"
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <input
                    {...register("password")}
                    className="form-control"
                    type="password"
                    id="password"
                  />
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
                <br />
                <NavLink className="d-block my-3" to={"/Register"}>
                  Don't have an account, Register Now!
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
