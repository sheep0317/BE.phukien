const express = require('express');
require('dotenv').config();
const app = express();
const userRouter = require('./api/user/user.router');
const productRouter = require('./api/product/product.router');
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.listen(process.env.APP_PORT, () => {
  console.log('Server running on port 3000');
});