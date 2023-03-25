const express = require('express');
const { CONNECTION_STRING} = require('./config');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./api/routes/user.router');
const authRouter = require('./api/routes/auth.router');
const reviewRouter = require('./api/routes/review.router');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
mongoose.connect("mongodb+srv://saidamovie:Semaye_1401@cluster0.u5cnm5c.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("CONNECTED TO DB"))
    .catch(err => console.log(err));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewRouter );

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err?.message || "Server error",
        statusCode: err.statusCode || 500
    })
})
module.exports = app;
