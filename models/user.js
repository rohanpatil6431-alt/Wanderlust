const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
   
});
userSchema.plugin(passportLocalMongoose); // adds username, hash and salt fields to the schema and also adds some methods for authentication

module.exports = mongoose.model('User', userSchema);