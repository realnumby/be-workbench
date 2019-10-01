const {body, param, query, validationResult} = require('express-validator');

function validationErrorHandler(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    next();
}

module.exports = {

    validatePost() {
        return [
            body('username', 'Username cannot be empty').not().isEmpty(),
            body('preferences', 'Preferences cannot be empty').exists(),
            validationErrorHandler
        ]
    },
    validatePut() {
        return [
            param('uuid', 'Invalid ID').isUUID(),
            body('preferences', 'Preferences cannot be empty').exists(),
            validationErrorHandler
        ]
    },
    validateGet() {
        return [
            param('uuid', 'Invalid ID').isUUID(),
            validationErrorHandler
        ]
    },
    validateQuery() {
        return [
            query('username', 'Username is required').not().isEmpty(),
            validationErrorHandler
        ]
    },
    validateDelete() {
        return [
            param('uuid', 'Invalid ID').isUUID(),
            validationErrorHandler
        ]
    },
};