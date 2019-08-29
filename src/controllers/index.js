const preferences = require('./preferences');
const notes = require('./notes');

module.exports = (db) => {
    return {
        preferences: preferences(db.UserPreferences),
        notes: notes()
    }
};