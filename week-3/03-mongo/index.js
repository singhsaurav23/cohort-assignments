const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to week3 assignment");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});