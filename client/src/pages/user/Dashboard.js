import React from "react";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/Auth";
import Layout from "../../components/layout/layout";
import "../../styles/AdminStyle.css"

const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
              <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="card-user">
            <h1 className="greeting">
                Welcome Back, <span className="user-name">{auth?.user?.name}</span>!
              </h1>
              <p className="info">Email: {auth?.user?.email}</p>
              <p className="info">Phone: {auth?.user?.phone}</p>
              <p className="info">Address: {auth?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
