const request = require('supertest');

const express = require('express');
const app = express();
// Mock db
const db = {
    UserPreferences: {
        create: jest.fn((body) => Promise.resolve(body)),
        findAll: jest.fn(() => Promise.resolve([userPref])),
        findByPk: jest.fn(() => Promise.resolve(userPref)),
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

    afterEach(() => {
        db.UserPreferences.create.mockClear();
        db.UserPreferences.findAll.mockClear();
        db.UserPreferences.findByPk.mockClear();
    });

    test('It should list all preferences', async () => {
        await request(app).get('/api/allpreferences').expect(200, [userPref]);
        expect(db.UserPreferences.findAll).toHaveBeenCalled();
    });

    test('It should get preference by ID', async () => {
        await request(app).get('/api/preferences/14023249-e187-4d16-b789-940d5d293a77').expect(200, userPref);
        expect(db.UserPreferences.findByPk).toHaveBeenCalled();
    });

    test('It should get preference by query', async () => {
        await request(app).get('/api/preferences?username=user1').expect(200, [userPref]);
        expect(db.UserPreferences.findAll).toHaveBeenCalledWith({"where": {"username" : "user1"}});
    });

    test('It should be able to delete by ID', async () => {
        userPref.destroy = jest.fn(() => Promise.resolve());
        await request(app).delete('/api/preferences/14023249-e187-4d16-b789-940d5d293a77').expect(204);
        expect(userPref.destroy).toHaveBeenCalled();
    });

    test('It should be able to post preference', async () => {
        await request(app).post('/api/preferences').send(userPref).expect(201);
        expect(db.UserPreferences.create).toHaveBeenCalled();
    });

    test('It should be able to update preference', async () => {
        userPref.update = jest.fn(() => Promise.resolve());
        await request(app).put('/api/preferences/14023249-e187-4d16-b789-940d5d293a77').send(userPref).expect(200);
        expect(userPref.update).toHaveBeenCalled();
    });

    test('It should fail for invalid ID', () => {
        return request(app).get('/api/preferences/wrongId').expect(422);
    });

    test('It should fail for invalid query string', () => {
        return request(app).get('/api/preferences?invalidQuery').expect(422);
    });
});
