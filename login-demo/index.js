import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from 'url';

import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//**** GET  ****/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/echo/:message", (req, res) => {
  const message = req.params.message;
  if (message === "secret") {
    res.send("the secret is... 42!");
  } else {
    res.send(message);
  }
});

app.get("/login" , (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
})

app.get("/my-account" , (req, res) => {
  res.sendFile(path.join(__dirname, "public", "my-account.html"));
})
app.get("/error" , (req, res) => {
  res.sendFile(path.join(__dirname, "public", "error.html"));
})



//**** POST  ****/

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@example.com' && password === '111') {
    res.redirect('/my-account');
  } else {
    res.redirect('/error');
  }
});




//****  ****/
//****  ****/



const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
