const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

// cors
const cors = require("cors");

const app = express();

mongoose.connect('mongodb://localhost:27017/textile-firm', { useUnifiedTopology: true, })

app.use("/uploads", express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cors());

const user = require("./routers/user");
const firm = require("./routers/firm");
const order = require("./routers/order");

app.use("/user", user);
app.use('/firm', firm);
app.use("/order", order);


app.use((req, res, next) => {
    const error = new Error('Not Founded');
    res.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.json({
        error: error.message
    })
});

module.exports = app;