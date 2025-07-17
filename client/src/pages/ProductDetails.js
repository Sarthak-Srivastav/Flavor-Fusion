import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout/layout";

// import "../fonts/Blackboard.otf";
// import "../fonts/ChalkboyRegular-vmXe7.otf";
// import "../fonts/ChalktasticItalic-YYA4.ttf";
// import "../fonts/Helloworld-ovvY0.ttf";
import "../fonts/KgHoloceneRegular-lgjKy.ttf";

import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/productCard.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  //initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="more-d-box">
            <div
              className="col-md-5 detail-box"
              // className="col-md-7 detail-box-2_1 logo-font"
              style={{
                color: "white",
                fontSize: "27px",
                // fontFamily: "Blackboard",
                // fontFamily: "HelloWorld",
                // fontFamily: "Chalkboy",
                // fontFamily: "Chalktasticitalic",
                fontFamily: "KgHolocene",
                cursor: "pointer",
                marginRight: "30px",
                marginLeft: "20px",
              }}
            >
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                // height="300"
                // width={"350px"}
              />
              <div className="product-detail-box">
                <h6 id="p-name">Name: {product.name}</h6>
                <h6 id="p-brand">Origin: {product.brand}</h6>
                {/* <h1 id="p-name">Shipping: {product.shipping ? "Yes" : "No"}</h1> */}
                <h6 id="p-category">Category : {product?.category?.name}</h6>

                <h6 id="p-price">Calories: {product.price}</h6>
                <h6 id="p-price">Type: {product.type}</h6>
                {/* <button className="btn btn-dark ms-2">
                    Add to Favorites ❤️
                  </button> */}
              </div>
            </div>
            <div
              className="col-md-7 detail-box-2_1 logo-font"
              style={{
                color: "white",
                fontSize: "27px",
                // fontFamily: "Blackboard",
                // fontFamily: "HelloWorld",
                // fontFamily: "Chalkboy",
                // fontFamily: "Chalktasticitalic",
                fontFamily: "KgHolocene",
                cursor: "pointer",
                marginRight: "30px",
                marginLeft: "20px",
                overflowWrap: "break-word",
              }}
            >
              {/* <h1 className="text-center">Product Details</h1> */}
              <h3 id="p-description">
                <h6 id="p-t-description">Recipe Instruction</h6>
                <pre>{product.description}</pre>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div>
        <h3 className="text-center">Similar Recipes</h3>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Recipes Found</p>
        )}

        <div className="d-flex flex-wrap justify-content-around">
          {relatedProducts?.map((p) => (
            <div className={"card-1"} key={p._id}>
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={`/api/v1/product/product-photo/${p?._id}`}
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
                  onClick={() => {
                    navigate(`/product/${p.slug}`);
                    scrollToTop();
                  }}
                >
                  More Details
                </button>
                <button
                  className="button"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Product Added To Cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="d-flex flex wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 45)}...</p>
                <p className="card-text">₹ {p.price}</p>

                <button className="btn btn-secondary ms-2">Add to cart</button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </Layout>
  );
};

export default ProductDetails;
