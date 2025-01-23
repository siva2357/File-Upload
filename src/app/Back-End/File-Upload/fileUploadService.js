const ProjectUpload = require('./fileUploadModel'); // Assuming the model is in models/uploadModel.js

// Create a new project
exports.createProject = async (projectData) => {
  try {
    const newProject = new ProjectUpload(projectData);
    await newProject.save();
    return newProject;
  } catch (err) {
    throw new Error('Error creating project: ' + err.message);
  }
};

// Get all projects
exports.getAllProjects = async () => {
  try {
    const projects = await ProjectUpload.find();
    return projects;
  } catch (err) {
    throw new Error('Error fetching projects: ' + err.message);
  }
};

// Get project by ID
exports.getProjectById = async (id) => {
  try {
    const project = await ProjectUpload.findById(id);
    return project;
  } catch (err) {
    throw new Error('Error fetching project by ID: ' + err.message);
  }
};

// Update a project by ID
exports.updateProject = async (id, updatedData) => {
  try {
    const updatedProject = await ProjectUpload.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedProject;
  } catch (err) {
    throw new Error('Error updating project: ' + err.message);
  }
};

// Delete a project by ID
exports.deleteProject = async (id) => {
  try {
    await ProjectUpload.findByIdAndDelete(id);
    return { message: 'Project deleted successfully' };
  } catch (err) {
    throw new Error('Error deleting project: ' + err.message);
  }
};
