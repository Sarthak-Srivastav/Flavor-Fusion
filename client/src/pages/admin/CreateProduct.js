import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateProduct.css";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [shipping, setShipping] = useState("");

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  // const handleCreate = async (e) =>{
  //   e.preventDefault()
  //   try{
  //     const productData = new FormData()
  //     productData.append("name",name)
  //     productData.append("description",description)
  //     productData.append("price",price)
  //     productData.append("Quantity",quantity)
  //     productData.append("photo",photo)
  //     productData.append("category",category)
  //     const {data} = axios.post('/api/v1/product/create-product', productData )
  //     if(data?.success){
  //       toast.success('Product Created Successfully')
  //       navigate('/dashboard/admin/products')
  //     }else{
  //       toast.error(data?.message)
  //     }
  //   }
  //   catch(error){
  //     console.log(error)
  //     toast.error('something went wrong')
  //   }
  // }

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("type", type);
      // productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("brand", brand);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="conatiner-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Create Recipe 🥗</h1>
            <div className="CreateProduct">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Select.Option
                    key={c._id}
                    value={c._id}
                    className="custom-option"
                  >
                    {c.name}
                  </Select.Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product-Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={brand}
                  placeholder="Write Country Of Origin"
                  className="form-control"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write Recipe Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write The Recipe"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write Total Calories"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={type}
                  placeholder="Write Type"
                  className="form-control"
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="number"
                  value={quantity}  
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div> */}
              {/* <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Select.Option className="custom-option" value="0">
                    No
                  </Select.Option>
                  <Select.Option className="custom-option" value="1">
                    Yes
                  </Select.Option>
                </Select>
              </div> */}
              <div className="mb-3">
                <button className="CreateBtn" onClick={handleCreate}>
                  CREATE RECIPE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
// hello
export default CreateProduct;
