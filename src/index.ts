import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import currencyRoutes from "./routes/currencies";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3009;

// Middleware hai 
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(bodyParser.json());

// Routes hai
app.get("/", (req: Request, res: Response): any => res.send("Welcome to the Currency Conversion API"));
app.use("/api", currencyRoutes);

// Error Handling Middleware hai
app.use((req: Request, res: Response, next: NextFunction): any => {
  // console.error(err.message, 'error hai');
  return res.status(500).json({ error: "Internal Server Error" });
});

// Start Server hai
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
