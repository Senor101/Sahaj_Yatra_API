import express from 'express';

const app = express();

import apiRouter from './api/v1/routes/api.router'

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/v1",apiRouter);

// app.use(notFound);

export default app;