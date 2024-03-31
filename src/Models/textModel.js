//creating here an input Schema

const { Schema, model } = require("mongoose");
const validator = require('validator');

const inputSchema = new Schema({
    input:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
        validate: {
            validator: function(value) {
                return !validator.isEmpty(value) && !/[^\w\s]/.test(value);
            },
            message: "otp should not be empty and should not contain special characters"
        }
    }
})

const Input = model("Input",inputSchema);

module.exports = Input;