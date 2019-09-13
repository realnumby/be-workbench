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
const notesExpected = {
    "status": "OK",
    "message": "",
    "body": [
    {
        "name": "/Ane/testnote",
        "id": "2EKZ8YHCD",
        "noteurl": "mock/#/notebook/2EKZ8YHCD"
    },
    {
        "name": "/BjornRoar/test1",
        "id": "2EMUE6W9B",
        "noteurl": "mock/#/notebook/2EMUE6W9B"
    }
]};

app.use('/api', require('../../routes/notes')(db));

describe('Test /api/notebook endpoints', () => {

    beforeEach(() => {
        moxios.install()
    });
    afterEach(() => {
        moxios.uninstall()
    });

    test('It should list all notes with url to each note', async () => {
        moxios.stubRequest('mock/api/notebook', {
            status: 200,
            response: notesBase
        });
        await request(app).get('/api/notebook').expect(200, notesExpected);
    });

    test('It should get a single note', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B', {
            status: 200,
            response: notesBase.body[1]
        });
        await request(app).get('/api/notebook/2EMUE6W9B').expect(200, notesExpected.body[1]);
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

});
