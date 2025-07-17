import React from "react";
import Layout from "../components/layout/layout";
import { useSearch } from "../context/search";
import "../styles/productCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleAddToFav = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Recipe added to Favorites");
  };

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center mt-3">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Recipes Found"
              : `Found ${values?.results.length}`}
          </h6>
        </div>

        <div className="d-flex flex-wrap justify-content-around">
          {values?.results.map((p) => (
            <div className="card-1" key={p._id}>
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt="Product"
                />
              </div>

              <div className="product-details">
                <h3 className="product-name">Name: {p.name}</h3>
                <p className="product-description">Origin: {p.brand}</p>
                <p className="product-description">Calories: {p.price}</p>
                <p className="product-description">Type: {p.type}</p>
              </div>

              <div className="buttons-container">
                <button
                  className="button"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button className="button" onClick={() => handleAddToFav(p)}>
                  Add to Fav
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
