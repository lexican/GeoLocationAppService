const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);

mongoose.connect('mongodb://localhost:27017/ip', { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true});
mongoose.connection.once('open', ()=> {
  console.log("Connected successfully");
});


require('./routes/index')(app);
app.listen(4040, '0.0.0.0',() => console.log("The server is running on port 4040")); 