require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./api/routes/contactRoutes');
const connectDb=require('./api/db/connectDB')
const blogRoutes =require('./api/routes/blogRoute')
const userRoutes =require('./api/routes/userRoute')

connectDb();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users',userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
