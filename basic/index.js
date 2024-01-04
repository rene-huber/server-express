import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const staff = ["Sally", "Bob", "Mike", "Rachel", "Andy", "Greg"];


//**** GET  ****/

app.get("/", (request, response) => {
  console.log("Someone wants the root route!");
  response.send("Welcome to our site! 😎");
});

app.get("/staff", (req, res) => {
  res.json({
    people: staff,
  });
});

app.get("/staff/:person", (req, res) => {
  const name = req.params.person;
  if (staff.includes(name)) {
    res.json({
      name: name,
      description: `${name} is a valued employee here at our company!`,
    });
  } else {
    res.status(404).json({ error: "Staff member not found" });
  }
});

app.get("/contact", function (req, res) {
  console.log("serving contact-form.html...");
  res.sendFile(path.join(__dirname, "public", "contact-form.html"));
});


//**** POST  ****/


app.post("/contact", function (req, res) {
  try {
    console.log("We got a message! Somebody wrote:", req.body.message);
  res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});





const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
