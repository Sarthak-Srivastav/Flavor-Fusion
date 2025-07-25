import express from "express";
import {
  ContactUsController,
  forgetPasswordController,
  // getAllOrdersController,
  // getOrdersController,
  loginController,
  // orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

// router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

//Forget Password || POsST
router.post("/forget-password", forgetPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected route for users
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);
export default router;

/*
//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
*/
//Contact Us || METHOD POST
router.post("/contactMessage", ContactUsController);
