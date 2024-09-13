const Resource = require('../models/resourceModel');

// Get all resources with search, sorting, and pagination
exports.getAllResources = async (req, res) => {
    try {
        const { search, sortBy, order, page = 1, limit = 5 } = req.query; // Default page: 1, limit: 5 items per page

        // Parse page and limit as integers
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        // Initialize query object for searching
        let query = {};

        // If search query exists, filter by name or description
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },         // Case-insensitive search in name
                    { description: { $regex: search, $options: 'i' } }  // Case-insensitive search in description
                ]
            };
        }

        // Initialize sorting options
        let sortOptions = {};
        if (sortBy) {
            const sortField = ['name', 'description'].includes(sortBy) ? sortBy : 'createdAt';  // Default to sorting by createdAt if invalid field
            const sortOrder = order === 'desc' ? -1 : 1;  // Default to ascending order
            sortOptions[sortField] = sortOrder;
        } else {
            sortOptions['createdAt'] = 1; // Default sorting by createdAt if no sortBy is specified
        }

        // Pagination setup
        const skip = (pageNum - 1) * limitNum; // Calculate how many resources to skip
        const total = await Resource.countDocuments(query); // Get total number of matching resources

        // Find resources based on query, apply sorting and pagination
        const resources = await Resource.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum);

        // Return paginated results and metadata
        res.status(200).json({
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            totalResources: total,
            resources
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific resource by ID
exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new resource
exports.createResource = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newResource = new Resource({ name, description });
        await newResource.save();
        res.status(201).json(newResource);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update an existing resource
exports.updateResource = async (req, res) => {
    try {
        const { name, description } = req.body;
        const resource = await Resource.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json({ message: 'Resource deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
