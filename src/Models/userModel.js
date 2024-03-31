const { Schema, model } = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const userSchema = new Schema({
    userName:{
        type:String,
        validator:(value) => {
            if(validator.isEmpty(value)){
                throw new Error("user name should be provided")
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validator:(value) => {
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
            if(validator.isEmpty(value)){
                throw new Error("Email is empty")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validator:(value)=>{
            if(validator.isEmpty(value)){
                throw new Error("this field should not be empty")
            }
            if(!validator.equals(value.toLowerCase(),'password')){
                throw new Error("You can't kept the password as 'Password'")
            }
        }
    },
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }],
    code:[{
        type:Schema.Types.ObjectId,
        ref:"Code"
    }]
})

//code to generate an token
userSchema.methods.generateToken = async function() {
    const user = this;
    try{
        const token = jwt.sign(
            {_id:user._id.toString()},
            'secret-key',
        )
        user.tokens.push({token});
        return token;
    }
    catch(error){
        console.log(error);
    }
}

userSchema.methods.sayHello = function() {
    console.log(`hi my name is ${this.userName}`);
}

const User = model("User",userSchema);

module.exports = User;