const mongoose = require('mongoose');
const ResourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Resource', ResourceSchema);
