import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";

const Messages = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="conatiner-fluid m-3 p3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Messages</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
