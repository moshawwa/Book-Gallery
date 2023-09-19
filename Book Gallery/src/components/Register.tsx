import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiClient from "../services/ApiClient";

/*
  React-hook-form

  fields : 
  username,
  email,
  passowrd, 
  confirm password

  1- Make a form to register a new user 
  2- make sure to use default validation
  3- Password, Confirm Password
  4- Password must Include at least 1 character
  5- Password must Include at least Uppercase character
  6- Password must Include at least Lowercase character

*/

const schema = z
  .object({
    email: z.string().email(),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    password: z.string().min(6),
    confirm: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const handleRegister = (data: FormData) => {
    console.log(data);
    setIsLoading(true);

    ApiClient.post("/Auth/register", data)
      .then((response) => {
        console.log(response.data);
        toast.success("Reigsterd completed, please login in");
        navigate("/Login", { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.errors);
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mb-4">
                  <label className="form-label" htmlFor="firstname">
                    First Name :
                  </label>
                  <input
                    {...register("firstname")}
                    className="form-control"
                    type="text"
                    id="firstname"
                  />
                  {errors.firstname && (
                    <span className="text-danger">
                      {errors.firstname.message}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="lastname">
                    Last Name :
                  </label>
                  <input
                    {...register("lastname")}
                    className="form-control"
                    type="text"
                    id="lastname"
                  />
                  {errors.lastname && (
                    <span className="text-danger">
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
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
                    Password :
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
                <div className="mb-4">
                  <label className="form-label" htmlFor="confirm">
                    Confirm Password :
                  </label>
                  <input
                    {...register("confirm")}
                    className="form-control"
                    type="password"
                    id="confirm"
                  />
                  {errors.confirm && (
                    <span className="text-danger">
                      {errors.confirm.message}
                    </span>
                  )}
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                      <span className="ms-2" role="status">
                        Signin up ...
                      </span>
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
                <br />
                <NavLink className="d-block my-3" to={"/Login"}>
                  Already have an account, Login!
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
