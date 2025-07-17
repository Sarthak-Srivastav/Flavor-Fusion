// import React from "react";
// import Layout from "../components/layout/layout";

// const Contact = () => {
//   return (
//     <Layout>
//       <h1>Contact Page</h1>
//     </Layout>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import Layout from "../components/layout/layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FiInstagram } from "react-icons/fi";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Contact = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/contactMessage", {
        fullname,
        email,
        message,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          {/* <img className="displayed"
            src="/images/contact-1.jpg"
            alt="contact-us"
            x
            style={{ width: "100%" }}
          /> */}

          <div className="contactForm">
            <div className="form">
              <h2 className="title">Contact US</h2>

              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-control"
                    id="exampleInputFullName"
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
                    id="exampleInputEmail"
                    placeholder="Enter Your Email "
                    required
                    autocomplete="off"
                  />
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-control"
                    id="exampleInputMessage"
                    placeholder="Enter Your Message"
                    required
                    autocomplete="off"
                  />
                </div>
                <div className="inputBox">
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h1 className="h1-back text-white">CONTACT US</h1>
          <p className="text-justify mt-2">
          Any Query And Info About Any Service Feel Free To Call Anytime We 24x7 Available
          </p>
          <p className="mt-3">
            <Link
              className="social-link instagram"
              to="https://www.instagram.com/flavor_fussion"
            >
              <FiInstagram /> : Instagram
            </Link>
          </p>
          <p className="mt-3">
            <Link
              className="social-link facebook"
              to="https://www.facebook.com/flavor_fussion/"
            >
              <FaSquareFacebook /> : Facebook
            </Link>
          </p>
          <p className="mt-3">
            <Link className="social-link whatsapp" to="https://wa.me//919999900000">
              <FaWhatsapp /> : Whatsapp
            </Link>
          </p>
          <p className="mt-3">
            <BiMailSend /> : Flavor_Fusion@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 99907 61180{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
