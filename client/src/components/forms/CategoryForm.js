import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form className="ManageCategory" onSubmit={handleSubmit}>
        <div className="mb-3 p-1">
          <input
            id="form-textbox-admin"
            type="text"
            className="form-control"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="ui-btn">
          <span> Submit</span>
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
