const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  file: { fileName: { type: String, required: true }, url: { type: String, required: true } },
  projectTitle: { type: String, required: true, },
  projectType: { type: String, required: true, enum: ['Art Concepts', '3D Environment', '3D Animations', 'Game Development', 'AR/VR'] },
  projectDescription: { type: String, required: true },
  softwares: { type: String, required: true },
  tags: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProjectUpload', uploadSchema);