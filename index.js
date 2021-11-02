const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Database Connection
const db =require('./config/database');

//Database Testing
db.authenticate()
    .then(() => {
        console.log('Kết nối thành công!');
    })
    .catch(err => {
        console.log('Lỗi kết nối:', err);
    });
const app = express();

//Routers
app.get('/', (req, res) => {
  res.send("Index");
});

app.use('/products',require('./routes/products'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});