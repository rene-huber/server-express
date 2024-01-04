import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (request, response) => {
  console.log("Someone wants the root route!");

  response.send("Welcome to our site! 😎");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
