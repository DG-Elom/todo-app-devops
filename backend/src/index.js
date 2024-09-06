const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URI;

app.use(cors());
app.use(express.json());


const promise = mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
promise.then(() => {
  console.log("Connected on the database!");
});
mongoose.set("strictQuery", false);

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));