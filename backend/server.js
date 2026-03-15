const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Enquiry = require("./models/Enquiry");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/enquirydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("server is running");
});

// CREATE
app.post("/api/enquiry", async (req, res) => {
  const newEnquiry = new Enquiry(req.body);
  await newEnquiry.save();
  res.send("enquiry saved");
});

// READ
app.get("/api/enquiry", async (req, res) => {
  const enquiries = await Enquiry.find();
  res.json(enquiries);
});

// UPDATE ✅
app.put("/api/enquiry/:id", async (req, res) => {
  const updated = await Enquiry.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE ✅
app.delete("/api/enquiry/:id", async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
