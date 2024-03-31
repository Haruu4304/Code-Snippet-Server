const Code = require("../Models/codeModel");
const User = require("../Models/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async(req,res) => {
    try{
        const {userName,email,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            res.status(401).json({message:"This user is already present."})
        }
        
        const hashPassword = await bcrypt.hash(password,saltRounds);
        const newUser = new User({userName,email,password:hashPassword});

        await newUser.generateToken();
        
        await newUser.save();

        res.status(200).json({message:"Register Successfull",newUser});
    } catch(error)
    {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await user.generateToken();

        res.status(200).json({user, token, message: `${user.userName} Login Successful` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const postData = async(req,res) => {
    try{
        const { id } = req.params; 
        const user = await User.findById(id); 
        const {code} = req.body;

        const newOTP = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();
        const data = await Code({
            code:code,
            otp:newOTP
        })

        user.code.push(data._id);
        await data.save();
        await user.save();

        res.status(200).json({ otp: newOTP });
    } catch(error)
    {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
}

const getDataWithOtp = async(req,res) => {
    try{
        const {otp} = req.body;

        const data = await Code.findOne({otp});

        if(data){
            const getCodes = await data.code;
            res.status(200).json({getCodes});
        }
    } catch(error)
    {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
}

const getDataWithUsername = async(req,res) => {
    try{
        const {userName} = req.params;
        const user = await User.findOne({userName});

        if(user){
            await user.populate('code');

            const populateCode = await user.code;

            res.status(200).json({populateCode});
        }

    } catch(error)
    {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
}
const updateUserData = async (req, res) => {
    try {
        const { _id } = req.query;
        const codeData = await Code.findById(_id);

        if (!codeData) {
            return res.status(404).json({ message: "Code not found." });
        }

        const code = req.body.code; // Assuming req.body.code contains the updated code data as an object
        codeData.code = code;

        await codeData.save();

        return res.status(200).json({ message: "Update successful", code: codeData });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
}

const getUserName = async (req, res) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const usersWithCode = users.filter(user => user.code && user.code.length > 0);

        if (usersWithCode.length === 0) {
            return res.status(400).json({ message: "No user provided any code" });
        }

        const userNames = usersWithCode.map(user => user.userName);

        res.status(200).json({ userNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {updateUserData,getDataWithUsername,getDataWithOtp,postData,loginUser,register,getUserName}