require('dotenv').config();
const contactRoutes = require('./api/routes/contactRoutes');
const blogRoutes = require('./api/routes/blogRoute');
const userRoutes = require('./api/routes/userRoute');
const authRoutes = require('./api/routes/authRoute');
const express =require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDb=require("./api/db/connectDB")
// const app = require('./api/routes/index');
const passport = require('passport');
const cookieParser = require('cookie-parser');

connectDb();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());

app.use('/api', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
