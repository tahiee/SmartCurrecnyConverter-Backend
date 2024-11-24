import express, { Request, Response, NextFunction } from "express";

import axios from "axios";

const router = express.Router();
const BASE_URL = "https://api.freecurrencyapi.com/v1";
console.log(BASE_URL);

// Get all supported currencies
router.get("/currencies", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${BASE_URL}/currencies`, {
      params: {
        apikey: process.env.API_KEY,
      },
    });
    // console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching currencies:", error);
    res.status(500).json({ error: "Failed to fetch currencies" });
  }
});

// Convert currency
router.post("/convert", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { base, amount } = req.body;
    if (!base || !amount) {
      return res.status(400).json({ error: "Base currency and amount are required" });
    }
    console.log(amount,'YEA AMOUNT HAIa');
    console.log(base, 'YEA BASECURRET HAI');
  
    const response = await axios.get(`${BASE_URL}/latest`, {
      params: {
        apikey: process.env.API_KEY,
        base_currency: base,
      },
    });
    const rate = response.data.data;
    if (!rate || typeof rate !== "object") {
      return res.status(500).json({ error: "Unexpected API response format" });
    }
    console.log('rate data API say',rate);

    const reStructData = Object.entries(rate).map(([key, value]) => ({
      currency: key,
      amount: value as number * amount,
    }));
    console.log("Structured conversion data:", reStructData);

    if (!reStructData) {
      return res.status(400).json({ error: "Invalid target currency" });
    }
    console.log("frontend say request aei?");
    
    res.json({
      reStructData,
      base,
      rate,
      amount,
    });
  } catch (error) {
    console.error("Error converting currency:", error);
    res.status(500).json({ error: "Failed to perform currency conversion" });
  }

});

export default router;
