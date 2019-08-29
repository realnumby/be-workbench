
module.exports = (app, db) => {
    app.use('/health', require('./health')(db));
    app.use('/api', require('./preferences')(db));
    app.use('/api', require('./notes')(db));
};