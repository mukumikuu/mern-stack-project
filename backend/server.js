// const express = require('express'); -> old traditional way
import express from "express";

const app = express();

app.listen(3001, () => {
  // () => is a callback function running after the server starts successfully
  console.log("Server started at http://localhost:3001");
});
// test
