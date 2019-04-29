const request = require('supertest');

const express = require('express');
const app = express();
// Mock db
const db = {
    UserPreferences: {
        create: (body) => {
            return Promise.resolve(body);
        },
        findAll: (args) => {
            return Promise.resolve([userPref]);
        },
        findByPk: (uuid) => {
            return Promise.resolve(userPref);
        },
    }
};
// Mock user preference
const userPref = {
    "uuid": "14023249-e187-4d16-b789-940d5d293a77",
    "username": "user1",
    "preferences": {
        "language": "nb"
    }
}

app.use('/api', require('../../routes/preferences')(db));

describe('Test the root paths', () => {
    test('It should respond to GET for /api', () => {
        return request(app).get('/api/').expect(200);
    });
});

describe('Test /api/preferences endpoints', () => {

    test('It should list all preferences', () => {
        return request(app).get('/api/allpreferences').expect(200, [userPref]);
    });

    test('It should get preference by ID', () => {
        return request(app).get('/api/preferences/14023249-e187-4d16-b789-940d5d293a77').expect(200, userPref);
    });

    test('It should get preference by query', () => {
        return request(app).get('/api/preferences?username=user1').expect(200, [userPref]);
    });

    test('It should be able to delete by ID', () => {
        userPref.destroy = () => {
            return Promise.resolve();
        };
        return request(app).delete('/api/preferences/14023249-e187-4d16-b789-940d5d293a77').expect(204);
    });

    test('It should be able to post preference', () => {
        return request(app).post('/api/preferences').send(userPref).expect(201);
    });

    test('It should be able to update preference', () => {
        userPref.update  = () => {
            return Promise.resolve();
        };
        return request(app).put('/api/preferences/14023249-e187-4d16-b789-940d5d293a77').send(userPref).expect(200);
    });

    test('It should fail for invalid ID', () => {
        return request(app).get('/api/preferences/wrongId').expect(422);
    });

    test('It should fail for invalid query string', () => {
        return request(app).get('/api/preferences?invalidQuery').expect(422);
    });
});
