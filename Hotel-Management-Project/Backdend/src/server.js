require('dotenv').config();

const express = require('express');

require('./config/db.config');

const app = express();

// Middleware: req.body se JSON data receive karne ke liye
app.use(express.json());

app.use('/api', require('./routes/'));

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error :", err);
        return;
    }
    console.log(`Server is started on port ${process.env.PORT}...`);
});