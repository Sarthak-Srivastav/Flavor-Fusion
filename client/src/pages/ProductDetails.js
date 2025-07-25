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
import { useAuth } from "../context/Auth";
import "../styles/productCard.css";
import { FaStar } from "react-icons/fa";

// Helper to render stars for display (read-only)
const renderStars = (rating, max = 5) =>
  Array.from({ length: max }, (_, i) => (
    <span key={i} className={i < rating ? "star filled" : "star inactive"}>★</span>
  ));

// Helper to render avatar
const renderAvatar = (user) => {
  if (user?.name) {
    return <div className="review-avatar">{user.name[0].toUpperCase()}</div>;
  }
  return <div className="review-avatar">U</div>;
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [auth] = useAuth();
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);
  const REVIEWS_PER_PAGE = 3;
  const paginatedReviews = reviews.slice(
    reviewPage * REVIEWS_PER_PAGE,
    reviewPage * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
  );
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

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

  // Fetch reviews when product loads
  useEffect(() => {
    if (product._id) fetchReviews();
  }, [product._id]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/v1/reviews/${product._id}`);
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
    } catch (err) {
      setReviews([]);
      setAverageRating(0);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        `/api/v1/reviews/${product._id}`,
        { rating: newRating, comment: newComment },
        {
          headers: { Authorization: auth?.token || undefined }
        }
      );
      toast.success("Review submitted!");
      setNewRating(5);
      setNewComment("");
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not submit review");
    } finally {
      setSubmitting(false);
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

      {/* Review & Rating Section */}
      <div className="review-section">
        <div className="review-header-main">
          <div className="review-title">Reviews</div>
          <div className="average-rating">
            <div className="stars">{renderStars(Math.round(averageRating))}</div>
            <span style={{ color: '#222', fontWeight: 600, marginLeft: 6 }}>{averageRating.toFixed(1)}</span>
            <span style={{ color: '#888', fontSize: '1rem', marginLeft: 4 }}>/ 5</span>
          </div>
        </div>
        {auth?.user && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h4>Write a Review</h4>
            <div className="form-group">
              <label>Rating:</label>
              <div className="rating-stars-input">
                {Array.from({ length: 5 }, (_, i) => {
                  const isFilled = hoverRating ? i <= hoverRating - 1 : i <= newRating - 1;
                  const isHovered = hoverRating && i === hoverRating - 1;
                  return (
                    <button
                      type="button"
                      key={i}
                      className={
                        "rating-star-btn" +
                        (isFilled ? " filled" : " inactive") +
                        (isHovered ? " hovered" : "")
                      }
                      onClick={() => setNewRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="form-group">
              <label>Comment:</label>
              <textarea value={newComment} onChange={e => setNewComment(e.target.value)} required className="comment-input" placeholder="Write your review..." />
            </div>
            <button type="submit" className="submit-review-btn" disabled={submitting}>{submitting ? "Submitting..." : "Submit Review"}</button>
          </form>
        )}
        {!auth?.user && <p className="login-to-review">Login to leave a review.</p>}
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review this recipe!</p>
        ) : (
          <>
            <div className="reviews-list">
              {paginatedReviews.map((r, idx) => (
                <div className="review-card" key={r._id || idx}>
                  <div className="review-header">
                    {renderAvatar(r.user)}
                    <span className="review-user">{r.user?.name || "User"}</span>
                    <span className="review-date">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="review-rating">{renderStars(r.rating)}</div>
                  <div className="review-comment">{r.comment}</div>
                </div>
              ))}
            </div>
            {reviews.length > REVIEWS_PER_PAGE && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '1.2rem' }}>
                <button
                  onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
                  disabled={reviewPage === 0}
                  style={{
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '50%',
                    width: 38,
                    height: 38,
                    fontSize: 22,
                    color: '#888',
                    cursor: reviewPage === 0 ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                    transition: 'background 0.15s',
                  }}
                  aria-label="Previous reviews"
                >
                  &#8592;
                </button>
                <span style={{ color: '#888', fontSize: 15 }}>
                  {reviewPage + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setReviewPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={reviewPage >= totalPages - 1}
                  style={{
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '50%',
                    width: 38,
                    height: 38,
                    fontSize: 22,
                    color: '#888',
                    cursor: reviewPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                    transition: 'background 0.15s',
                  }}
                  aria-label="Next reviews"
                >
                  &#8594;
                </button>
              </div>
            )}
          </>
        )}
      </div>

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
