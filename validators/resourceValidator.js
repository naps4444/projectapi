const Joi = require('joi');

exports.validateResource = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};
