const preferences = require('./preferences');

module.exports = (db) => {
    return {
        preferences: preferences(db.UserPreferences)
    }
};