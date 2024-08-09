require("dotenv").config();
const contactRoutes = require("./api/routes/contactRoutes");
const blogRoutes = require("./api/routes/blogRoute");
const userRoutes = require("./api/routes/userRoute");
const authRoutes = require("./api/routes/authRoute");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const emaillimitRoute = require("./api/routes/emailLimitRoute");
const emailLimit = require("./api/routes/contactRoutes");

const bodyParser = require("body-parser");
// const connectDB = require("./api/db/connectDB");

const passport = require("passport");
const cookieParser = require("cookie-parser");
const connectDB = require("./api/db/connectDB");
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;
const sessionSecret = process.env.SESSION_SECRET;
app.use(
  cors({
    origin: URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cookieParser());

app.use("/api", contactRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", emailLimit, emaillimitRoute);

app.use(express.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
