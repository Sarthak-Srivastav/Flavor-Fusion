import express from "express";
import { addReview, getProductReviews } from "../controllers/reviewController.js";
import { requireSignIn } from "../middleware/authMiddleware.js"; // adjust if needed

const router = express.Router();

router.post("/:productId", requireSignIn, addReview);
router.get("/:productId", getProductReviews);

export default router;