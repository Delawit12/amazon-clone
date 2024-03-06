import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_KEY);
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;
// express server
const server = express();
// cors true to accept any request from any where

server.use(cors({ origin: true }));

// to enable server to read JSON data
server.use(express.json());

server.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    // paymentIntent is holding the intenstion why we held the payment
    // there is a paymentIntent that the stripe send as a json format
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } else {
    res.status(403).json({
      message: "total payment must be greater than one ",
    });
  }
});
server.get("/", (req, res) => {
  res.status(200).send("the server is running on the specified port");
});

server.get("/test", (req, res) => {
  res.send("test url");
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
