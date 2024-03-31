const Input = require("../Models/textModel");

const postData = async (req, res) => {
    try {
        const { input } = req.body;
        if (!input) {
            return res.status(400).json({ message: "Input not found" });
        }

        const otp = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();
        console.log(otp);

        const inputData = await Input.create({ input, otp:otp.toString() });

        res.status(200).json({ message: "Input data is stored successfully", otp });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllData = async (req, res) => {
    try {
        const {otp} = req.query;
        const inputData = await Input.findOne({otp});

        if(inputData){
            console.log("i got an otppppp");
            const text = await inputData.input;
            res.status(200).json({text});
            console.log(text);
        } else {
            console.log("i don't found any otp");
        }

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { postData, getAllData };
