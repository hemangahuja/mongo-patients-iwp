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
        res.status(200).send(p._id);
    } catch (e) {
        res.status(500).send("no");
    }
})

app.get("/home", (req, res) => {
    console.log("here");
    res.status(200).send("hello");
})

app.get("/search", (req, res) => {
    const { id } = req.body;
    Patient.findById(id, (err, patient) => {
        if (err) {
            res.send(404).send("not found");
        }
        else res.status(200).send(patient);
    })

})

app.get("/searchName", (req, res) => {
    const { prefix } = req.body;
    Patient.find({
        name: {
            $regex: `^${prefix}.*$`
        }
    }, (err, patients) => {
        if (err) {
            res.send(404).send("not found");
        }
        else res.status(200).send(patients);
    })
})

app.put("/age", (req, res) => {
    try {
        const { id, age } = req.body;
        Patient.findByIdAndUpdate(id, {
            age
        }, {}, () => {
            res.status(200).send("ok");
        });
    } catch (e) {
        res.status(500).send("no");
    }
})

app.get("/sorted", (req, res) => {
    Patient.find({}, null, { sort: { age: 1 } }, (err, patients) => {
        if (err) res.status(500).send("no");
        else res.status(200).send(patients);
    })
})

app.get("/max", (req, res) => {
    Patient.find({}, null, { sort: { fee: -1 }, limit: 1 }, (err, patients) => {
        if (err) res.status(500).send("no");
        else res.status(200).send(...patients);
    })
})

app.listen(3000, () => {
    console.log("listening");
})