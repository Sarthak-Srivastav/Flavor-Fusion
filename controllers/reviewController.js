import Review from "../models/reviewModel.js";
import Products from "../models/productModel.js";
import reviewRoute  from "../routes/reviewRoute.js";

// Add a review
export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id; // assuming you use auth middleware

    // Check if product exists
    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Optional: Prevent multiple reviews by same user
    const existing = await Review.findOne({ product: productId, user: userId });
    if (existing) return res.status(400).json({ error: "You already reviewed this product" });

    const review = new Review({
      product: productId,
      user: userId,
      rating,
      comment,
    });
    await review.save();

    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all reviews for a product + average rating
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate("user", "name");
    const avg =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;
    res.json({ reviews, averageRating: avg });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};