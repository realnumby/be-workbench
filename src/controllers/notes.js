const get = require('axios').get;
const del = require('axios').delete;
const post = require('axios').post;
const env = process.env.NODE_ENV;
const properties = require('../properties')[env];

module.exports = function () {

    let url = properties.api.notebookService;
    function getHeaders(req) {
        return {
            "accept": req.headers["accept"] || "*/*",
            "authorization": req.headers["authorization"] || "",
            "content-type": "application/json",
        };
    }

    function handleError(res) {
        return (error) => {
            if (error.response) {
                res.status(error.response.status).send(error)
            } else {
                res.status(400).send(error)
            }
        };
    }

    return {
        getNotes(req, res) {
            console.log("Using headers", getHeaders(req));
            return get(url + "notebook", {headers: getHeaders(req)})
                .then((response) => res.status(response.status).send(response.data))
                .catch(handleError(res));
        },
        getNote(req, res) {
            return get(url + "notebook/" + req.params.id, {headers: getHeaders(req)})
                .then((response) => res.status(response.status).send(response.data))
                .catch(handleError(res));
        },
        deleteNote(req, res) {
            return del(url + "notebook/" + req.params.id, {headers: getHeaders(req)})
                .then((response) => res.status(response.status).send(response.data))
                .catch(handleError(res));
        },
        createNote(req, res) {
            return post(url + "notebook", req.body, {headers: getHeaders(req)})
                .then((response) => res.status(response.status).send(response.data))
                .catch(handleError(res));
        },
        createParagraph(req, res) {
            return post(url + "notebook/" + req.params.id + "/paragraph", req.body, {headers: getHeaders(req)})
                .then((response) => res.status(response.status).send(response.data))
                .catch(handleError(res));
        },
    };


};