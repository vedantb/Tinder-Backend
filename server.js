import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Cards from "./models/dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connectionURL = "mongodb+srv://admin:July4usa@cluster0.pmnos.mongodb.net/tinderdb?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(cors());

// DB Config
mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

// API Endpoints
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.get("/tindercards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/tindercards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on localhost:${port}`));
