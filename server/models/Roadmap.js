const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roadmap: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Roadmap", RoadmapSchema);
