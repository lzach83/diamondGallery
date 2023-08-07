import "./loadEnv";
import cors from "cors";
import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.raw({ type: "image/*", limit: "10mb" }));

app.use("/", routes);

// Global error handling
app.use((_req, res) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(port, () => console.log(`APP ON ${port}`));
