const express = require("express");
const authRouter = require('./authRoute');
const blogRouter = require('./blogRoute');
const userRouter = require('./userRoute');


const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/blog', blogRouter);

module.exports = router;
