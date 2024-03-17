import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let [err,setErr]=useState('')
  let navigate=useNavigate()

  async function onSignUpFormSubmit(userObj) {
    let res;
    //http post req to user-api
    if(userObj.userType==='user'){
     res=await axios.post('http://localhost:4000/user-api/user',userObj)
    }
    if(userObj.userType==='author'){
      res=await axios.post('http://localhost:4000/author-api/user',userObj)
     }
    if(res.data.message==='User created' || res.data.message==='Author created'){
      //navigate to signin
      navigate("/signin")
    }else{
      setErr(res.data.message)
    }
    
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Blogup</h2>
            </div>
            <div className="card-body">

              {/* user register error message */}
              
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
              {err.length!==0&&<p className="text-danger text-center">{err}</p>}
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--light-dark-grey)",
                    }}
                  >
                    Register as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType", { required: true })}
                    />
                    <label
                      htmlFor="author"
                      className="form-check-label"
                      style={{ color: "var(--dark-green)" }}
                    >
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType", { required: true })}
                    />
                    <label
                      htmlFor="user"
                      className="form-check-label"
                      style={{ color: "var(--dark-green)" }}
                    >
                      User
                    </label>
                  </div>
                  {errors.userType && <p className="text-danger">User type is required.</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username", { required: true, minLength: 4, maxLength: 20 })}
                  />
                  {errors.username && errors.username.type === "required" && <p className="text-danger">Username is required.</p>}
                  {errors.username && errors.username.type === "minLength" && <p className="text-danger">Username must be at least 4 characters long.</p>}
                  {errors.username && errors.username.type === "maxLength" && <p className="text-danger">Username cannot exceed 20 characters.</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                  />
                  {errors.password && errors.password.type === "required" && <p className="text-danger">Password is required.</p>}
                  {errors.password && errors.password.type === "minLength" && <p className="text-danger">Password must be at least 6 characters long.</p>}
                  {errors.password && errors.password.type === "maxLength" && <p className="text-danger">Password cannot exceed 20 characters.</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <p className="text-danger">Email is required.</p>}
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="text-light"
                    style={{ backgroundColor: "maroon" }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
