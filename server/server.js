require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Roadmap = require("./models/Roadmap");

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Route to generate roadmap from NeuralSeek
app.post("/generate-roadmap", async (req, res) => {
  try {
    const { prompt, variables } = req.body; // Frontend sends these

    // Call NeuralSeek
    const response = await axios.post(
      `${process.env.NEURALSEEK_URL}/maistro`,
      {
        prompt,
        variables
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.NEURALSEEK_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const roadmapJSON = response.data; // assuming NeuralSeek returns JSON

    // Save to MongoDB
    const newRoadmap = new Roadmap({
      title: variables.target_role || "Untitled Roadmap",
      roadmap: roadmapJSON
    });
    await newRoadmap.save();

    res.json({
      success: true,
      roadmap: roadmapJSON
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to fetch all saved roadmaps
app.get("/roadmaps", async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
