const request = require('supertest');
const moxios = require('moxios');

const express = require('express');
const app = express();
// Mock db
const db = {
    UserPreferences: {}
};
// Mock notesBase
const notesBase = {
    "status": "OK",
    "message": "",
    "body": [
    {
        "name": "/Ane/testnote",
        "id": "2EKZ8YHCD"
    },
    {
        "name": "/BjornRoar/test1",
        "id": "2EMUE6W9B"
    }
]};

// Mock notesExpected
const notesExpected = (lds) => {
    return ({
        "status": "OK",
        "message": "",
        "body": [
            {
                "name": "/Ane/testnote",
                "id": "2EKZ8YHCD",
                "noteurl": "mock" + lds + "/#/notebook/2EKZ8YHCD"
            },
            {
                "name": "/BjornRoar/test1",
                "id": "2EMUE6W9B",
                "noteurl": "mock" + lds + "/#/notebook/2EMUE6W9B"
            }
        ]
    })};

app.use('/api', require('../../routes/notes')(db));

describe('Test /api/notebook endpoints', () => {

    beforeEach(() => {
        moxios.install()
    });
    afterEach(() => {
        moxios.uninstall()
    });

    test('It should use the correct Notebook URL', async () => {
        moxios.stubRequest('mock/api/notebook', {
            status: 200,
            response: notesBase
        });
        await request(app).get('/api/notebook?lds=A').expect(200, notesExpected(""));
        moxios.stubRequest('mockB/api/notebook', {
            status: 200,
            response: notesBase
        });
        await request(app).get('/api/notebook?lds=B').expect(200, notesExpected("B"));
        moxios.stubRequest('mockC/api/notebook', {
            status: 200,
            response: notesBase
        });
        await request(app).get('/api/notebook?lds=C').expect(200, notesExpected("C"));
    })

    test('It should list all notes with url to each note', async () => {
        moxios.stubRequest('mock/api/notebook', {
            status: 200,
            response: notesBase
        });
        await request(app).get('/api/notebook').expect(200, notesExpected(""));
    });

    test('It should get a single note', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B', {
            status: 200,
            response: notesBase.body[1]
        });
        await request(app).get('/api/notebook/2EMUE6W9B').expect(200, notesExpected("").body[1]);
    });

    test('It should delete a single note', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B', {
            status: 204,
            response: notesBase[1]
        });
        await request(app).delete('/api/notebook/2EMUE6W9B').expect(204);
    });

    test('It should return 404 not found', async () => {
        moxios.stubRequest('mock/api/notebook/XX', {
            status: 404
        });
        await request(app).get('/api/notebook/XX').expect(404);
    });

    test('It should post a new note', async () => {
        let response = {"body" : "generatedId"};
        moxios.stubRequest('mock/api/notebook', {
            status: 201,
            response: response
        });
        await request(app).post('/api/notebook').send({"name" : "dummy"}).expect(201, response);
    });

    test('It should post a new paragraph', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B/paragraph', {
            status: 201
        });
        await request(app).post('/api/notebook/2EMUE6W9B/paragraph').send({"name" : "dummy"}).expect(201);
    });

    test('It should run all paragraphs', async () => {
        moxios.stubRequest('mock/api/notebook/job/2EMUE6W9B', {
            status: 200
        });
        await request(app).post('/api/notebook/job/2EMUE6W9B').expect(200)
    })

    test('It should stop all paragraphs', async () => {
        moxios.stubRequest('mock/api/notebook/job/2EMUE6W9B', {
            status: 200
        });
        await request(app).del('/api/notebook/job/2EMUE6W9B').expect(200)
    })

    test('It should run a paragraph', async () => {
        moxios.stubRequest('mock/api/notebook/run/2EMUE6W9B/20190917-155649_1796555479', {
            status: 200
        });
        await request(app).post('/api/notebook/run/2EMUE6W9B/20190917-155649_1796555479').send({"name" : "dummy"}).expect(200);
    });

    test('It should stop a paragraph', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B/paragraph/20190917-155649_1796555479', {
            status: 200
        });
        await request(app).delete('/api/notebook/2EMUE6W9B/paragraph/20190917-155649_1796555479').expect(200)
    });

    test('It should return a paragraph', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B/paragraph/20190917-155649_1796555479', {
            status: 200,
            response: paragraph.body
        });
        await request(app).get('/api/notebook/2EMUE6W9B/paragraph/20190917-155649_1796555479').expect(200, paragraph.body);
    });
});

const paragraph = {
    "status": "OK",
    "message": "",
    "body": {
        "text": "%md\nIt works",
        "user": "anonymous",
        "results": {
            "code": "SUCCESS",
            "msg": [{
                "type": "HTML",
                "data": "\u003cdiv class\u003d\"markdown-body\"\u003e\n\u003cp\u003eIt works\u003c/p\u003e\n\u003c/div\u003e"
            }
            ]
        }
    }
}
