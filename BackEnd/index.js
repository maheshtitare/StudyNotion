// ================== IMPORTS ==================
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// ================== CONFIG ==================
dotenv.config();
const PORT = process.env.PORT || 4000;

// ================== DATABASE ==================
database.connect();

// ================== MIDDLEWARES ==================

// 🔥 IMPORTANT: body parser (routes se pehle)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 IMPORTANT: TEMP OPEN CORS (Postman + Render fix)
app.use(
  cors({
    origin: true,        // allow ALL origins (Postman, frontend, etc.)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 DEBUG: incoming request logger (VERY IMPORTANT)
app.use((req, res, next) => {
  console.log("INCOMING 👉", req.method, req.url);
  next();
});

app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ================== CLOUDINARY ==================
cloudinaryConnect();

// ================== ROUTES ==================
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// ================== ROOT ROUTE ==================
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// ================== SERVER ==================
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
