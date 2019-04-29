const router = require('express').Router();

module.exports = (db) => {
    router.get("/alive", function (req, res) {
        res.status(200).send();
    });

    router.get("/ready", function (req, res) {
        db.sequelize.authenticate()
            .then(() => {
                res.status(200).send();
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                res.status(503).send({
                    message: 'Unable to connect to the database',
                });
            });
    });
    return router;
};