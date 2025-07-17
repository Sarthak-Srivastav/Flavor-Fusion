import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/productCard.css";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container pt-3">
        <h4 className="text-center">Category - {category?.name}</h4>

        <h6 className="text-center">{products?.length} Result Found</h6>
        <div className="row">
          <div className="col-md-12 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className={"card-1"} key={p._id}>
                  <div className="product-image-container">
                    <img
                      className="product-image"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt="Product Image"
                    />
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">Name: {p.name}</h3>
                    <p className="product-descpription">Origin: {p.brand}</p>
                    <p className="product-description">Calories: {p.price}</p>
                    {/* <p className="product-description">
                      <p className="topic">Description</p>
                      {p.description}</p> */}
                    <p className="product-description">Type: {p.type}</p>
                    {/* {p.description.substring(0, 30)}... */}
                  </div>
                  <div className="buttons-container">
                    <button
                      className="button"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="button">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
