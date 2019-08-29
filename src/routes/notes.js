const router = require('express').Router();

const bodyParser = require('body-parser');
const addRequestId = require('express-request-id')();
const logger = require('morgan');
const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

module.exports = (db) => {
    const notesController = require('../controllers')(db).notes;

    // Set up request log and its associated response log to have the same id
    router.use(addRequestId);

    logger.token('id', function getId(req) {
        return req.id
    });

    router.use(logger(loggerFormat, {
        skip: function (req, res) {
            return res.statusCode < 400
        },
        stream: process.stderr
    }));

    router.use(logger(loggerFormat, {
        skip: function (req, res) {
            return res.statusCode >= 400
        },
        stream: process.stdout
    }));

    // Json parser for validatePost requests
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.get("/notebook", notesController.getNotes);
    router.get("/notebook/:id", notesController.getNote);
    router.delete("/notebook/:id", notesController.deleteNote);
    router.post("/notebook", notesController.createNote);
    router.post("/notebook/:id/paragraph", notesController.createParagraph);
    return router;
};