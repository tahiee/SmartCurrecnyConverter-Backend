import dotenv from "dotenv";

dotenv.config();

if (!process.env.API_KEY) {
  throw new Error("API_KEY is missing in the environment file");
}

export const API_KEY = process.env.API_KEY;
