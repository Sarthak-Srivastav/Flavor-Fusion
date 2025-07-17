// import React, { useState, useEffect } from 'react';
// import AdminMenu from './../../components/layout/AdminMenu';
// import Layout from './../../components/layout/layout';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';
// import "../../styles/Products.css"

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   //get all products
//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:3000/api/v1/product/get-product");
//       setProducts(data.products);
//     } catch (error) {
//       console.log(error);
//       toast.error("Something Went Wrong");
//     }
//   };

//   //lifecycle method
//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <Layout>
//       <div className='row'>
//         <div className='col-md-3'>
//           <AdminMenu />
//         </div>
//         <div className='col-md-9'>
//           <h1 className='text-center'>All Products List</h1>
//           <div className='d-flex'>
//             {products?.map((p) => (
//               <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}
//               className='product-link'>
//                 <div className='card m-2' style={{ width: '18rem' }} key={p._id}>
//                   <img src={`/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} />
//                   <div className='card-body'>
//                     <h5 className='card-title'>{p.name}</h5>
//                     <p className='card-text'>{p.description}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Products;

import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/layout/AdminMenu";
import Layout from "./../../components/layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../../styles/productCard.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/get-product"
      );
      setProducts(data.products);
      console.log("Received data:", data);
      console.log("Current products state:", products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="conatiner-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Recipes List</h1>
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <Link
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="product-link"
                  >
                    {/* <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div> */}
                    <div className="card-1" key={p._id}>
                      <div className="product-image-container">
                        <img
                          className="product-image"
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt="Product Image"
                        />
                      </div>
                      <div className="product-details">
                        <h4 className="product-brand-h4">
                          <b>Origin :</b> {p.brand}
                        </h4>
                        <h4 className="product-name-h4">
                          <b>Name :</b> {p.name}
                        </h4>
                        {/* <h4 className="product-description-h4">
                          <b>Desc :</b> {p.description}
                        </h4> */}
                        <h4 className="product-description-h4">
                          <b>Type :</b> {p.type}
                        </h4>
                        {/* <h4 className="product-qty-h4">
                          <b>Qty :</b> {p.quantity}
                        </h4> */}
                        <h4 className="product-price-h4">
                          <b>Calories :</b> {p.price}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
