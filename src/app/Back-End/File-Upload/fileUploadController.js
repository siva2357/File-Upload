const projectService = require('./fileUploadService');

// Controller for creating a project
exports.createProject = async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = await projectService.createProject(projectData);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller for getting all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller for getting a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller for updating a project by ID
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const updatedData = req.body;
    const updatedProject = await projectService.updateProject(projectId, updatedData);
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller for deleting a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    await projectService.deleteProject(projectId);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
