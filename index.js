const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const userRouter = require('./api/user/user.router');
const productRouter = require('./api/product/product.router');
const cartRouter = require('./api/cart/cart.router');
const billRouter = require('./api/bill/bill.router');

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/bill", billRouter);


app.listen(process.env.APP_PORT, () => {
  console.log('Server running on port 3000');
});