const request = require('supertest');

const express = require('express');
const app = express();
// Mock db
const db = {
    sequelize: {
        authenticate: () => {
            return Promise.resolve()
        }
    }
};

app.use('/health', require('../../routes/health')(db));

describe('Test health endpoints', () => {

    test('It should respond to GET for /alive', () => {
        return request(app).get('/health/alive').expect(200);
    });

    test('It should respond to GET for /ready and hit the database', () => {
        return request(app).get('/health/ready').expect(200);
    });

    test('It should respond Service Unavailable when the db is down', () => {
        db.sequelize.authenticate = () => {
            return Promise.reject("Database is down!")
        };
        return request(app).get('/health/ready').expect(503);
    });
});
