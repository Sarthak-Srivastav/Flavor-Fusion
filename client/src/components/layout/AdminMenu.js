import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4 id="admin-heading">Admin Panel</h4>
          <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
            Create Category
          </NavLink>
          <NavLink to="/dashboard/admin/create-recipe" className="list-group-item list-group-item-action">
            Create Recipe
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
            Recipes
          </NavLink>
          {/* <NavLink to="/dashboard/admin/Messages" className="list-group-item list-group-item-action">
            Messages
          </NavLink> */}
          {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
            Users
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
