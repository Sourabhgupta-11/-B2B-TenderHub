const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL ="mongodb://127.0.0.1:27017/iNotebook"; 
//const mongoURL=process.env.MONGODB_URL

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

db.on('error', (err) => {
  console.log('Error opening MongoDB connection:', err);
});


module.exports=db;