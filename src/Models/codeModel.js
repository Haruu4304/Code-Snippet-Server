const { Schema, model } = require("mongoose");
const validator = require('validator');
const codeSchema = new Schema({
    code:{
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
const Code = model("Code",codeSchema);
module.exports = Code;