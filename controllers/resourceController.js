const Resource = require('../models/resourceModel');

// Get all resources
exports.getAllResources = async (req, res) => {
    const resources = await Resource.find();
    res.status(200).json(resources);
};

// Get a specific resource by ID
exports.getResourceById = async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(resource);
};

// Create a new resource
exports.createResource = async (req, res) => {
    const { name, description } = req.body;
    const newResource = new Resource({ name, description });
    await newResource.save();
    res.status(201).json(newResource);
};

// Update an existing resource
exports.updateResource = async (req, res) => {
    const { name, description } = req.body;
    const resource = await Resource.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(resource);
};

// Delete a resource
exports.deleteResource = async (req, res) => {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json({ message: 'Resource deleted' });
};
