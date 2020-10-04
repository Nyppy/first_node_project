import express from 'express';
import routes from './lib/routes/index.mjs';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Helper from './dist/Helper.mjs'
 
const app = express();
 
var port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Welcome to Express')
});

app.listen(port, function() {
  console.log("Running api on Port "+ port);
})

app.use(bodyParser.urlencoded ({ 
  extended: true 
}));

app.use(bodyParser.json());

app.use('/api', routes)

const url = "mongodb+srv://admin:nodepass@cluster0.xsvt1.mongodb.net/node_db?retryWrites=true&w=majority";
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(url, options);

Helper.connectDB(mongo)