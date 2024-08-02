require('dotenv').config();
const contactRoutes = require('./api/routes/contactRoutes');
const blogRoutes = require('./api/routes/blogRoute');
const userRoutes = require('./api/routes/userRoute');
const authRoutes = require('./api/routes/authRoute');
const express =require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
// const connectDB = require("./api/db/connectDB");
const appRouter = require('./api/routes/index');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const connectDB =require('./api/db/connectDB');
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cookieParser());

app.use('/api', contactRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/auth',authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
