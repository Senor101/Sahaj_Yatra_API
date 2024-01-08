import http from "http";
require("dotenv").config();

import app from "./app"

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();