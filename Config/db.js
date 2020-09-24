const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/blog';
// const url ='mongodb+srv://eventpower:CFLgdlUVl8M4S6i0@cluster0-wc2en.mongodb.net/test?retryWrites=true&w=majority';
const db = mongoose.connection;

mongoose.connect(url, { useCreateIndex: true,  useUnifiedTopology: true , useNewUrlParser: true, useFindAndModify: false })

db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})




