const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connectDb = (url) => {
    mongoose
    .connect(url)
    .then((console.log("CONNECTED TO THE DB..")))
    .catch((err) => {console.log(err)})
}

module.exports = connectDb;