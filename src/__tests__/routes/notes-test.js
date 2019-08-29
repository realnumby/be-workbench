const request = require('supertest');
const moxios = require('moxios');

const express = require('express');
const app = express();
// Mock db
const db = {
    UserPreferences: {}
};
// Mock notes
const notes = [
    {
        "name": "/Ane/testnote",
        "id": "2EKZ8YHCD"
    },
    {
        "name": "/BjornRoar/test1",
        "id": "2EMUE6W9B"
    }
];

app.use('/api', require('../../routes/notes')(db));

describe('Test /api/notebook endpoints', () => {

    beforeEach(() => {
        moxios.install()
    });
    afterEach(() => {
        moxios.uninstall()
    });

    test('It should list all notes', async () => {
        moxios.stubRequest('mock/api/notebook', {
            status: 200,
            response: notes
        });
        await request(app).get('/api/notebook').expect(200, notes);
    });

    test('It should get a single note', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B', {
            status: 200,
            response: notes[1]
        });
        await request(app).get('/api/notebook/2EMUE6W9B').expect(200, notes[1]);
    });

    test('It should delete a single note', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B', {
            status: 204,
            response: notes[1]
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
        moxios.stubRequest('mock/api/notebook', {
            status: 201
        });
        await request(app).post('/api/notebook').send({"name" : "dummy"}).expect(201);
    });

    test('It should post a new paragraph', async () => {
        moxios.stubRequest('mock/api/notebook/2EMUE6W9B/paragraph', {
            status: 201
        });
        await request(app).post('/api/notebook/2EMUE6W9B/paragraph').send({"name" : "dummy"}).expect(201);
    });

});
