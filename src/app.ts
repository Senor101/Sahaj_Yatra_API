import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
require('dotenv').config();

const app = express();

import apiRouter from './api/v1/api'

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/v1",apiRouter);

// app.use(notFound);

export default app;