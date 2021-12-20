const mongoose = require('mongoose');
/**
 *   Email Model
 */

 const emailSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true }
    });
    
    module.exports = mongoose.model('Email', emailSchema);