import express from "express";
import { isAdmin, requireSignIn } from "./../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProduct,
  getProductController,
  productCountController,
  productFiltersController,
  productPhotoController,
  singleProductController,
  updateProductController,
  productListController,
  serachProductController,
  relatedProductController,
  productCategoryController,
  brainTreeTokenController,
  brainTreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", singleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProduct);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.post("/product-filters", productFiltersController);

// count product
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// serach product
router.get("/search/:keyword", serachProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", brainTreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
export default router;
