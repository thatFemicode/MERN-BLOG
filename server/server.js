// 1st step
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');

const app = express();
dotenv.config();
// 2ND sTEP
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

app.get('*', (req, res) => {
  res.send('Hello to Memories Api');
});
// 3RD sTEP
// const CONNECTION_URL =
//   'mongodb+srv://Ogunleye:tumininu10@cluster0.84if6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
// 4TH sTEP
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port : ${PORT}`))
  ).catch;
(error) => console.log(error.message);

// Ensures we dont get any warningns in the console

// 4th Step create routes for our app in routes folder