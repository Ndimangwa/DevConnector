const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connectDB
connectDB();

//Testing route
app.get('/', (req, res) => {
    res.send('App is Running!!!!!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
});