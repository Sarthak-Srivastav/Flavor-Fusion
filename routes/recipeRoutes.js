import express from "express";
import multer from "multer";
import { RecipeSubmissionController } from "../controllers/authController.js";
import RecipeSubmission from "../models/ContactUsModel.js";

const router = express.Router();
const upload = multer();

router.post("/submit", upload.single("photo"), RecipeSubmissionController);
router.get("/all", async (req, res) => {
  try {
    const submissions = await RecipeSubmission.find({}).sort({ createdAt: -1 });
    res.json({ submissions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const submission = await RecipeSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: "Not found" });
    res.json({ submission });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch submission" });
  }
});

export default router; 