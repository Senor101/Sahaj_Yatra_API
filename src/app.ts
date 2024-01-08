import express from 'express';

const app = express();

import apiRouter from './api'

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/v1",apiRouter);

// app.use(notFound);

export default app;