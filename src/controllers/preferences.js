
module.exports = function (UserPreferences) {

    return {
        create(req, res) {
            return UserPreferences.create({
                username: req.body.username,
                language: req.body.language,
                preferences: req.body.preferences,
            })
                .then((user) => res.status(201).send(user))
                .catch((error) => res.status(400).send(error));
        },

        update(req, res) {
            return UserPreferences.findByPk(req.params.uuid)
                .then(prefs => {
                    if (!prefs) {
                        return res.status(404).send({
                            message: 'User preferences not found',
                        });
                    }
                    return prefs
                        .update({
                            preferences: req.body.preferences || prefs.preferences,
                        })
                        .then(() => res.status(200).send(prefs))
                        .catch((error) => res.status(400).send(error));
                })
                .catch((error) => res.status(400).send(error));
        },

        retrieve(req, res) {
            return UserPreferences.findByPk(req.params.uuid)
                .then((prefs) => {
                    if (!prefs) {
                        return res.status(404).send({
                            message: 'User preferences not found',
                        });
                    }
                    return res.status(200).send(prefs);
                })
                .catch((error) => res.status(400).send(error));
        },

        destroy(req, res) {
            return UserPreferences.findByPk(req.params.uuid)
                .then((prefs) => {
                    if (!prefs) {
                        return res.status(400).send({
                            message: 'User preferences not found',
                        });
                    }
                    return prefs.destroy()
                        .then(() => res.status(204).send())
                        .catch(error => res.status(400).send(error));
                })
                .catch((error) => res.status(400).send(error));
        },

        query(req, res) {
            return UserPreferences.findAll({
                where: {username: req.query.username}
            })
                .then((result) => {
                    if (result.length == 0) {
                        return res.status(404).send({
                            message: 'User preferences not found',
                        });
                    }
                    return res.status(200).send(result);
                })
                .catch((error) => res.status(400).send(error));
        },

        list(req, res) {
            return UserPreferences.findAll()
                .then((users) => res.status(200).send(users))
                .catch((error) => res.status(400).send(error));
        },
    }
};