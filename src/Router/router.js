const express = require('express');
const {postData,getAllData} = require('../Controller/textController');
const router = express.Router();

router.post("/postInputData",postData);

router.get("/getAllthedata",getAllData);


module.exports = router;