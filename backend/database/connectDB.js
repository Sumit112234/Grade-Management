// import { configDotenv } from 'dotenv';
// const dotenv = require('dotenv');
import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';
// const mongoose = require('mongoose');


const connectDb =  async function(){   
    let uri = process.env.MONGO_URI;
    // console.log(uri)
    try {

        await mongoose.connect(uri);
        console.log("Mongoose Connected!");
    } catch (error) {
        console.log("Mongoose not connected!");
    }
}

export default connectDb;
// module.exports = connectDb;