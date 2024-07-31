const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./api/db/connectDB");
const appRouter = require('./api/routes/index');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());

app.get('/', (req, res)=>{
    return res.status(200).send("Hello World");
})

app.use('/api/v1', appRouter);

app.all("*", (req, res)=>{
    res.status(404).send("ERROR 404: Route not found");
})

connectDB(CONNECTION_STRING);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
    console.log(`http://localhost:${PORT}\n`);
})