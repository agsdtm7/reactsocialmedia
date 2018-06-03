const Validator = require("validator");
// documentation https://github.com/chriso/validator.js/
// the issue with the above documentation, it has to be a string
const isEmpty = require("./is-empty");
module.exports = function validatePostInput(data) {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    if (Validator.isEmpty(data.text)) {
        errors.email = 'Email field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};