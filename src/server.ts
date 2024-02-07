import http from 'http';
require('dotenv').config();

import app from './app';
import { connectDB } from './api/v1/config/db.config';
import User from './api/v1/models/user.model';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const keepServerLive = async () => {
    const request = await fetch(`${process.env.REMOTE_API}/user`);
};

const startServer = async () => {
    await connectDB();
    // KEEPING THE SERVER ALIVE TO PREVENT INSTANCE FROM GOING DOWN
    if (process.env.ENVIRONMENT === 'PRODUCTION') {
        setInterval(keepServerLive, 10000);
    }
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
