import express from "express";
import mongoose from "mongoose";
import Patient from "./model.js";



const app = express();

app.use(express.json());

await mongoose.connect(`mongodb://localhost:27017`, {
    dbName: "health_cube"
});

app.post("/randi", (req, res) => {
    try {
        const { name, age, fee } = req.body;
        const p = new Patient({
            name,
            age,
            fee
        });
        p.save();
        res.status(200).send("ok");
    } catch (e) {
        res.status(500).send("no");
    }
})

app.get("/home", (req, res) => {
    console.log("here");
    res.status(200).send("hello");
})

app.listen(3000, () => {
    console.log("listening");
})