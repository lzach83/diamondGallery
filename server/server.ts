import "./loadEnv";
import cors from "cors";
import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();

const port = process.env.PORT || 8080;

var allowlist = [
  "http://localhost:3000",
  "https://diamond-gallery-6ibg.vercel.app/",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, optionsSuccessStatus: 200 };
  } else {
    corsOptions = { origin: false, optionsSuccessStatus: 200 };
  }
  callback(null, corsOptions);
};

// MIDDLEWARE
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptionsDelegate));

app.use(cors());
app.use(express.json());
app.use(bodyParser.raw({ type: "image/*", limit: "10mb" }));

app.use("/", routes);

// Global error handling
app.use((_req, res) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(port, () => console.log(`APP ON ${port}`));
