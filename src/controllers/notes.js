const get = require('axios').get;
const del = require('axios').delete;
const post = require('axios').post;
const env = process.env.NODE_ENV;
const properties = require('../properties')[env];

module.exports = function () {

    let url = properties.api.notebookService;
    // Get the custom x-authorization from the request and use this for get authorized access to the external
    // notebook service
    function getHeaders(req) {
        return {
            "accept": req.headers["accept"] || "*/*",
            "authorization": req.headers["x-authorization"] || "",
            "content-type": "application/json",
        };
    }

    function handleError(res) {
        return (error) => {
            if (error instanceof Error) {
              console.debug("An error has occured: ", error)
              if (error.response && error.response.data) {
                res.status(error.response.status).send(error.response.data.message)
              } else if(error.response) {
                res.status(error.response.status).send(error.response)
              } else {
                res.status(500).send(error)
              }
            } else {
                res.status(400).send(error)
            }
        };
    }

  return {
    getNotes(req, res) {
      console.log("Using headers", getHeaders(req));
      return get(url + "api/notebook", {headers: getHeaders(req)})
        .then((response) => {
          // add note url to each note
          response.data.body.map(note => {
            note.noteurl = url + "#/notebook/" + note.id
          })
          res.status(response.status).send(response.data)
        })
        .catch(handleError(res));
    },
    getNote(req, res) {
      return get(url + "api/notebook/" + req.params.id, {headers: getHeaders(req)})
        .then((response) => {
          let body = response.data;
          body.noteurl = url + "#/notebook/" + req.params.id;
          res.status(response.status).send(body);
        })
        .catch(handleError(res));
    },
    deleteNote(req, res) {
      return del(url + "api/notebook/" + req.params.id, {headers: getHeaders(req)})
        .then((response) => res.status(response.status).send(response.data))
        .catch(handleError(res));
    },
    createNote(req, res) {
      return post(url + "api/notebook", req.body, {headers: getHeaders(req)})
        .then((response) => {
          let body = response.data;
          body.noteurl = url + "#/notebook/" + response.data.body;
          res.status(response.status).send(body);
        })
        .catch(handleError(res));
    },
    startJobs(req, res) {
      return post(url + "api/notebook/job/" + req.params.noteId, {}, {headers: getHeaders(req)})
        .then((response) => res.status(response.status).send(response.data))
        .catch(handleError(res));
    },
    stopJobs(req, res) {
      return del(url + "api/notebook/job/" + req.params.noteId, {headers: getHeaders(req)})
        .then((response) => res.status(response.status).send(response.data))
        .catch(handleError(res));
    },
    runParagraphSync(req, res) {
      return post(url + "api/notebook/run/" + req.params.noteId + "/" + req.params.paragraphId, null, {headers: getHeaders(req)})
        .then((response) => res.status(response.status).send(response.data))
        .catch(handleError(res));
    },
    stopParagraph(req, res) {
      return del(url + "api/notebook/" + req.params.noteId + "/paragraph/" + req.params.paragraphId, {headers: getHeaders(req)})
        .then((response) => res.status(response.status).send(response.data))
        .catch(handleError(res));
    },
    createParagraph(req, res) {
      return post(url + "api/notebook/" + req.params.id + "/paragraph", req.body, {headers: getHeaders(req)})
        .then((response) => res.status(response.status).send(response.data))
        .catch(handleError(res));
    },
    getParagraph(req, res) {
      return get(url + "api/notebook/" + req.params.noteId + "/paragraph/" + req.params.paragraphId, {headers: getHeaders(req)})
        .then((response) => {
          res.status(response.status).send(response.data)
        })
        .catch(handleError(res));
    }
  };

};