import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/prices";
import "../styles/productCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/filters.css";
import ImageSlider from "../components/layout/imageSlider";
import { cookingTips } from "../pages/tips";
import { MdTipsAndUpdates } from "react-icons/md";

import img1 from "../image/1111.jpg";
import img2 from "../image/1112.jpg";
import img3 from "../image/1113.jpg";
import img4 from "../image/1114.jpg";
import img5 from "../image/1115.jpg";
import img6 from "../image/1116.jpg";

const images = [img1, img2, img3, img4, img5, img6];

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tipOfTheDay, setTipOfTheDay] = useState("");
  const [tipIndex, setTipIndex] = useState(0);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * cookingTips.length);
    return cookingTips[randomIndex];
  };

  const getNextTip = () => {
    const nextIndex = (tipIndex + 1) % cookingTips.length;
    setTipIndex(nextIndex);
    setTipOfTheDay(cookingTips[nextIndex]);
  };

  useEffect(() => {
    setTipOfTheDay(getRandomTip());
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [
        ...prevProducts,
        ...shuffleArray(data.products),
      ]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [page]);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      setFilteredProducts(products);
    } else {
      filterProduct();
    }
  }, [products, checked, radio]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setFilteredProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout title={"All Recipes"}>
      <div className="tip-of-the-day">
        <button
          className="glitter-button"
          onClick={(e) => {
            getNextTip();
            const button = e.target;
            button.classList.add("animate");
            setTimeout(() => {
              button.classList.remove("animate");
            }, 600);
          }}
        >
          <MdTipsAndUpdates /> Show Cooking Tip
        </button>
        <div className="tip-content">
          <p>{tipOfTheDay}</p>
        </div>
      </div>

      <div className="App">
        <ImageSlider
          images={images}
          interval={5000}
          width="100%"
          height="700px"
        />
      </div>

      <div className="container-fluid row">
        <div className="row mt-2">
          <div className="col-md-2">
            <div className="filter-container">
              <div className="filter-section">
                <h4 className="filter-heading">Filter by category</h4>
                <div className="category-checkbox-container">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </div>
            </div>
            <div className="filter-container">
              <div className="filter-section">
                <h4 className="filter-heading">Filter by Calories</h4>
                <div className="radio-group-container">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {prices?.map((p) => (
                      <div key={p._id} className="radio-item">
                        <Radio value={p.array} className="custom-radio">
                          {p.name}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column">
              <button
                className="btn btn-danger reset-button"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          <div className="col-md-10">
            <h2 className="section-title">RECIPES</h2>
            <div className="d-flex flex-wrap justify-content-around">
              {filteredProducts?.map((p) => (
                <div className="card-1" key={p._id}>
                  <div className="product-image-container">
                    <img
                      className="product-image"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{p.name}</h3>
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
                    <button
                      className="button"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Product Added To Favorites");
                      }}
                    >
                      Add to Fav.
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="m-2 p-3 text-center">
              {filteredProducts && filteredProducts.length < total && (
                <button
                  className="btn btn-warning load-more-button"
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
