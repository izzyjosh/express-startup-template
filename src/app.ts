import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import compression from "compression";
import rateLimit from "express-rate-limit";
import errorHandler from "./middleware/errorHandler";
import config from "./config/config";
import { successResponse } from "./utils/successResponse";

export const app = express();

// Security headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    //set the origin and the credentials when using an actual client to make request to the server
    // origin: "https://yourfrontend.com",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
    // credentials: true
  })
);

// Log requests
app.use(morgan("dev"));

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Compress responses
app.use(compression());

// Rate limiter (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: "You have exceeded the 100 requests in 15 mins limit!"
    });
  }
});

// Session management (for login/auth)
app.use(
  session({
    secret: config.secretKey, // replace with env variable in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 360000 } // use true if using HTTPS, and increase maxAge to increases session expiration time
  })
);

// --- Example Routes ---

app.get("/", (req: Request, res: Response) => {
  successResponse({ res, statusCode: 200, message: "successfully displayed" });
});



// --- Error Handler Middleware ---
app.use(errorHandler);
