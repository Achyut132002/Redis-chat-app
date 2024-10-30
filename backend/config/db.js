const mongoose = require('mongoose');
require('dotenv').config();



const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        mongoose.set('strictQuery', false)
        const conn=await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true} );

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        //process.exit()
    }
}
module.exports = {connectDB}
