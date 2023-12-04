const express = require('express');

const router = express.Router();

router.get("/",(req,res,next)=> {
    res.send("<h1 align='center'>Welcome to HAMROBUS_API</h1>");
});

module.exports = router;