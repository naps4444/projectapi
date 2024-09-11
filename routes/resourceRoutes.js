const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { validateResource } = require('../validators/resourceValidator');

// CRUD Endpoints
router.get('/resource', resourceController.getAllResources);
router.get('/resource/:id', resourceController.getResourceById);
router.post('/resource', validateResource, resourceController.createResource);
router.put('/resource/:id', validateResource, resourceController.updateResource);
router.delete('/resource/:id', resourceController.deleteResource);

module.exports = router;
