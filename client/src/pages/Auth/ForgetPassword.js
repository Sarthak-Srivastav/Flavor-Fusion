import React, { useState } from "react";
// import Layout from "../../components/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
import "../../styles/login-forget.css";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import Layout2 from "../../components/layout/layout2";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Login Check function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forget-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  /*
  return (
    <Layout title={"Forget Password"}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Favorite Movie ?"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

*/

  return (
    <Layout2 title="Forget Password">
      <section
        className="body"
        style={{
          /* backgroundImage: `url(${backgroundImage})` */ backgroundColor:
            "black",
        }}
      >
        <section>
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
                <h2 className="title">Forget Password</h2>

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
                      autocomplete="off"
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Favorite Food"
                      required
                      autocomplete="off"
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type={showPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                      required
                      autocomplete="off"
                    />
                    <div className="toggle-icon-container">
                    {showPassword ? (
                      <FaEyeSlash className="password-toggle-icon" onClick={() => setShowPassword(false)} />
                    ) : (
                      <FaEye className="password-toggle-icon" onClick={() => setShowPassword(true)} />
                    )}
                    </div>
                  </div>

                  <div class="inputBox">
                    <input type="submit" value="RESET" />
                  </div>

                  {/* <button type="submit" className="btn btn-primary">
                    RESET
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Layout2>
  );
};

export default ForgetPassword;
