const express = require('express');
const { register, loginUser, postData, getDataWithOtp, getDataWithUsername,updateUserData, getUserName } = require('../Controller/userController');
const router = express.Router();

//1 authentication -> register (here user only able to get that stored data or to post any data in database)(generate token)
router.post("/register",register);

//2. login -> if user have that token then only he can able to login 
router.post("/loginUser",loginUser);

//3. post any data to store in database and to get an otp on behalf
router.post("/:id/postData",postData);

//4. get the data with otp
router.post("/getDataWithOtp",getDataWithOtp);

//5. get the data with userName
router.get("/:userName/getDataWithUsername",getDataWithUsername);

//6. update that data
router.patch("/:id/updateUserData",updateUserData);

//7.get userName only
router.get("/getUserName",getUserName);

module.exports = router;