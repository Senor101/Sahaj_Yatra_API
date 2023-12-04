const express = require("express");

const app = express();

const apiRouter = require('./routes/api.router')

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/v1",apiRouter);

// app.use(notFound);

module.exports = app;