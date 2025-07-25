import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

import reviewRoute from "./routes/reviewRoute.js";
import recipeRoutes from "./routes/recipeRoutes.js";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/reviews", reviewRoute);

//gemini
const MODEL_NAME = "gemini-2.5-flash";
const API_KEY = process.env.API_KEY;

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/recipe", recipeRoutes);

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "welcome to ecommerce app MERN",
  });
});

// Port
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(
    `Server Running ON ${process.env.DEV_MODE} mode on PORT ${PORT}`.bgCyan
      .white
  );
});

//Gemini
async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent(userInput);
  const response = await result.response;
  const text = response.text();
  return text || "Sorry, I didn't understand that. Please try again!";
}

app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log("incoming /chat req", userInput);
    if (!userInput) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
