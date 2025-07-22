import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://text-to-image-generator-1-04nn.onrender.com",
];

// apply cors to all routes
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// handle preflight requests explicitly
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => res.send("api working"));

app.listen(PORT, () => console.log("Server running on port " + PORT));
