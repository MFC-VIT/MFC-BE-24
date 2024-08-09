require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./api/db/connectDB");
const MongoDBStore = require('connect-mongodb-session')(session);

const contactRoutes = require("./api/routes/contactRoutes");
const blogRoutes = require("./api/routes/blogRoute");
const userRoutes = require("./api/routes/userRoute");
const authRoutes = require("./api/routes/authRoute");
const emaillimitRoute = require("./api/routes/emailLimitRoute");

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;
const URI = process.env.URI;

app.use(
  cors({
    origin: URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    store: new MongoDBStore({
      uri: URI,
      collection: 'sessions',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, 
      sameSite: 'none',
    },
    proxy: true, 
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", contactRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", emaillimitRoute);

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
