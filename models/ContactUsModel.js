import mongoose from "mongoose";

const RecipeSubmissionSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    origin: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RecipeSubmission", RecipeSubmissionSchema);
