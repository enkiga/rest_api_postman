// Setting requirments
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// middleware to parse the body of the request
app.use(express.json());

// Load environment variables from config/.env
dotenv.config({ path: "./config/.env" });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Check if MongoDB is connected
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected!");
});

// import user model
const User = require("./models/User");

// Seed data
const seedData = async () => {
  const users = await User.find();
  if (users.length === 0) {
    const users = [
      { name: "Alice", email: "alice@gmail.com", age: 25 },
      { name: "Bob", email: "bob@gmail.com", age: 30 },
      { name: "Charlie", email: "charlie@gmail.com", age: 35 },
    ];
    await User.insertMany(users);
    console.log("Seeded data");
  }
};

// Check if the database is empty and seed data
const checkAndSeed = async () => {
  try {
    await seedData();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

// Call the checkAndSeed function when the server starts
checkAndSeed();

// Routes

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post new user
app.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Put update user by id
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
