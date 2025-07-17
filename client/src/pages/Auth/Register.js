import React, { useState } from "react";
// import Layout from "./../../components/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
// import "../../styles/AuthStyles.css";
import "../../styles/register-style.css";
import Layout2 from "../../components/layout/layout2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        // address,
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
      <Layout title="Register - Ecommer App">
        <div className="form-container ">
          <form onSubmit={handleSubmit}>
            <h4 className="title">REGISTER FORM</h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Name"
                required
                autoFocus
              />
            </div>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Address"
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
                placeholder="What Is Your Favorite Movie ?"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              REGISTER
            </button>
          </form>
        </div>
      </Layout>
    );
  };
*/
  return (
    <Layout2 title="Register">
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
            <div className="container-register ">
              <div className="form">
                <h2 className="title">REGISTER</h2>

                <form onSubmit={handleSubmit}>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Name"
                      required
                      autoFocus
                      autocomplete="off"
                    />
                  </div>
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                      required
                      autocomplete="off"
                    />
                    <div className="toggle-icon-container">
                      {showPassword ? (
                        <FaEyeSlash
                          className="password-toggle-icon"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <FaEye
                          className="password-toggle-icon"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Phone"
                      required
                      autocomplete="off"
                    />
                  </div>
                  {/* <div className="inputBox">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Address"
                      required
                      autocomplete="off"
                    />
                  </div> */}
                  <div className="inputBox">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="What Is Your Favorite Food ?"
                      required
                      autocomplete="off"
                    />
                  </div>

                  <div className="inputBox">
                    <input type="submit" value="Register" />
                  </div>
                  {/* <button className="inputBox-button" type="submit">
                    REGISTER
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

export default Register;
