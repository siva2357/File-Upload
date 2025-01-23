const express = require('express');
const router = express.Router();
const projectController = require('./fileUploadController');

router.post('/project', projectController.createProject);
router.get('/projects', projectController.getAllProjects);
router.get('/project/:id', projectController.getProjectById);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);

module.exports = router;
