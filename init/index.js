const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const localUrl = 'mongodb://localhost:27017/airbnb-clone';

async function main() {
    await mongoose.connect(localUrl);
    console.log("Connected to MongoDB");
    await initDB();
}

main().catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

const initDB = async () => {
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({
    ...obj, owner: "69c3fb05832b96ab2765c848"})); 

   await Listing.insertMany(initData.data);
   console.log("data was initialized");
};