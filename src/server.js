const express = require('express');
const app = express();
const { createServer } = require('http');
const mongoose = require('mongoose');

const server = createServer(app);

mongoose.connect("mongodb+srv://saidamovie:Semaye_1401@cluster0.u5cnm5c.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("CONNECTED TO DB"))
    .catch(err => console.log(err));
server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});