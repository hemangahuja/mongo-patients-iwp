import mongoose from "mongoose";


const Patient = mongoose.model("patients", mongoose.Schema({
    name: "string",
    fee: "number",
    age: "number"
}));

export default Patient;