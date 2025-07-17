import React from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";

const UserMenu = () => {
  return (
    <>
      <div>
        <div className="text-center">
          <div className="list-group">
            <h4>Dashboard</h4>
            <NavLink
              to="/dashboard/user/profile"
              className="list-group-item list-group-item-action d-flex justify-content-start align-items-center"
            >
              <CgProfile size={24} />
              <span className="ml-2"> Profile</span>
            </NavLink>
            <NavLink
              to="/dashboard/user/favorite"
              className="list-group-item list-group-item-action d-flex justify-content-start align-items-center"
            >
              <CgProfile size={24} />
              <span className="ml-2"> Favorite</span>
            </NavLink>
            {/* <NavLink
              to="/dashboard/user/orders"
              className="list-group-item list-group-item-action  d-flex justify-content-start align-items-center"
            >
              <BsCart3 size={24} /> <span className="ml-2">Orders</span>
            </NavLink> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
