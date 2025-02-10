// const express = require('express'); -> old traditional way
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

// app.get("/products", (req, res) => {
//   // req -> request, res -> response
//   res.send("server is ready"); // this function sends the response to the client
// });

// get : retrieve data from the server, post : send data to the server, put : update data on the server, delete : delete data from the server
app.post("/products", async (req, res) => {
  const product = req.body; // user will send this data

  // check condition first that if there is no filled for anyone of the fields -> return error
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }

  // else
  const newProduct = new Product(product); // create a new product object (Product from product.model.js) from product getting from user

  try {
    await newProduct.save(); // save the product to the database
    res.status(201).json({ success: true, data: newProduct }); // send the response to the client, 200 -> success
  } catch (error) {
    console.error("Error in create peoduct: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" }); // 500 -> server error
  }
});

app.listen(3001, () => {
  // () => is a callback function running after the server starts successfully
  connectDB();
  console.log("Server start at http://localhost:3001");
});
