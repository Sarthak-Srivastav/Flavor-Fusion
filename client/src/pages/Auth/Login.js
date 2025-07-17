import React, { useState } from "react";
// import Layout from "../../components/layout/layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
import "../../styles/login-forget.css";
// import backgroundImage from "../../image/black-bg.jpg";

import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useAuth } from "../../context/Auth";
import Layout2 from "../../components/layout/layout2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Login Check function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //   return (
  //     <Layout title="Register - Ecommer App">
  //       <section>
  //         <div className="color" />
  //         <div className="color" />
  //         <div className="color" />
  //         <div className="box">
  //           <div className="square" style={{ "-i": 0 }} />
  //           <div className="square" style={{ "-i": 1 }} />
  //           <div className="square" style={{ "-i": 2 }} />
  //           <div className="square" style={{ "-i": 3 }} />
  //           <div className="square" style={{ "-i": 4 }} />
  //         </div>
  //       </div>

  //       <div className="container ">
  //         <div className="form">
  //           <h2 className="title">LOGIN</h2>
  //           <form onSubmit={handleSubmit}>
  //             <div className="inputBox">
  //               <input
  //                 type="email"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 className="form-control"
  //                 id="exampleInputEmail1"
  //                 placeholder="Enter Your Email "
  //                 required
  //               />
  //             </div>
  //             <div className="inputBox">
  //               <input
  //                 type="password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 className="form-control"
  //                 id="exampleInputPassword1"
  //                 placeholder="Enter Your Password"
  //                 required
  //               />
  //             </div>

  //             {/* <div className="forget">
  //               <button
  //                 type="button"
  //                 className="btn btn-primary"
  //                 onClick={() => {
  //                   navigate("/forget-password");
  //                 }}
  //               >
  //                 Forget Password
  //               </button>
  //             </div> */}

  //             <button type="submit" className="btn btn-primary">
  //               LOGIN
  //             </button>

  //             <div>
  //               <p className="forget">
  //                 Forgot Password ? <Link to="/forget-password">Click Here</Link>
  //               </p>
  //               <p className="forget">
  //                 Don't have an account ? <Link to="/register">Sign up</Link>
  //               </p>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </Layout>
  //   );
  // };

  return (
    <Layout2 title="Login">
      <section
        className="body"
        style={{
          /* backgroundImage: `url(${backgroundImage})` */
          backgroundColor: "black",
        }}
      >
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square" style={{ "--i": 0 }}></div>
          <div className="square" style={{ "--i": 1 }}></div>
          <div className="square" style={{ "--i": 2 }}></div>
          <div className="square" style={{ "--i": 3 }}></div>
          <div className="square" style={{ "--i": 4 }}></div>
          <div className="container-1 ">
            <div className="form">
              <h2 className="title">LOGIN</h2>
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="inputBox">
                <input
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                  required
                  autoComplete="off"
                />
                
                <div className="toggle-icon-container">
                  {showPassword ? (
                    <FaEyeSlash className="password-toggle-icon" onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaEye className="password-toggle-icon" onClick={() => setShowPassword(true)} />
                  )}
                </div>
              </div>


                <div className="inputBox">
                  <input type="submit" value="Login" />
                </div>

                {/* <button className="inputBox-button" type="submit" >
                    LOGIN
                  </button> */}

                <div>
                  <p className="forget">
                    Forgot Password ?{" "}
                    <Link to="/forget-password">Click Here</Link>
                  </p>
                  <p className="forget">
                    Don't have an account ? <Link to="/register">Sign up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* <div className="forget">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/forget-password");
                  }}
                >
                  Forget Password
                </button>
              </div> */}
        </div>
      </section>
    </Layout2>
  );
};
export default Login;
