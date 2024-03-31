const express = require('express');
const cors = require('cors');
const db = require('../config/Connection');
const inputRouter = require('./Router/router');
const userRouter = require("./Router/userRouter");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.use("/api/input",inputRouter);
app.use("/api/user",userRouter);

app.get("/",(req,res) => {
    res.send("heelloooo");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;