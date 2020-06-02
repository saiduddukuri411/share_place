const { router } = require("./Routes/places-route");
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http_errors");
const usersroute = require("./Routes/users-rote");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods",'GET,POST,PATCH,DELETE');

  next();
});

app.use("/api/places", router);
app.use("/api/users", usersroute);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});
const url =
  "mongodb+srv://saiduddukuri:Sgsgbs!456@cluster0-rbtfy.mongodb.net/mern?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });