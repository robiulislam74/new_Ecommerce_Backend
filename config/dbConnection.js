const mongoose = require('mongoose');

const dataBaseConnected = ()=>{
 mongoose.connect(process.env.DB_URL)
 .then(() => console.log('Connected!'));

}

module.exports = dataBaseConnected