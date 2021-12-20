const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/**
 * User Model
 */

const userSchema = mongoose.Schema(
{
    /**
     * 'unique' doesn't act as a validator -
     * it doesn't automatically throw an error if 
     * we try to add a new entry that's the same
     * as an existing email address. It will 
     * eventually lead to problems, we can't rely
     * on this for validating data
     * 
     * 'unique' allows mongoose / mongodb to do some 
     * internal optimization for performance
     */
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

/**
 * Plugins - additional functionality added
 * to the schema
 * 
 * uniqueValidator WILL validate entered email address
 * 
 * Will get an error if we try to save a email that already exists
 */
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
