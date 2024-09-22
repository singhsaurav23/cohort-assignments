import express from "express";
import { NUMBER } from "@repo/common/config"
const app = express()

console.log(NUMBER)
app.get("/", (req:any, res:any) => {
    res.json({
        message: "hello world"
    });
})

app.listen(3000)