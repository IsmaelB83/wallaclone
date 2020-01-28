'use strict';
// Node imports
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
// Own imports
const database = require('../database');

// Variables used in later tests
let jwt, advert;

// Load .env config file
require('dotenv').config();

/**
* Connect to mongo
*/
beforeAll(async () => {
  await database.connect(process.env.MONGODB_URL)
});

/**
* 1. AUTHENTICATION
*/
describe('1. Authenticatio tests', function () {
  test('Test 1.1: /apiv1/authenticate with right credentials returns 200', async () => {
    const login = {
      email: 'user@example.com',
      password: '1234'
    }
    const response = await request(app).post('/apiv1/authenticate').send(login)
    expect(200);
    expect(response.body.success).toBe(true);
    jwt = response.body.user.token;
  });

  test('Test 1.2: /apiv1/authenticate with wrong credentials returns 401', async () => {
    const login = {
      email: 'user@example.com',
      password: '123456'
    }
    request(app).post('/apiv1/authenticate').send(login).expect(401);
  });
})

/**
 * 2. PRIVATE ROUTES WITHOUT JWT
 */
describe('2. Private routes without jwt', function () {
  test('Test 2.1: /apiv1/adverts without jwt returns 401', async () => {
    request(app).get('/apiv1/adverts').expect(401);
  });

  test('Test 2.2: /apiv1/adverts/1231242 without jwt returns 401', async () => {
    request(app).get('/apiv1/adverts/1231242').expect(401);
  });

  test('Test 2.3: /apiv1/adverts/tags without jwt returns 401', async () => {
    request(app).get('/apiv1/adverts/tags').expect(401);
  });
})

/**
 * 3. PRIVATE ROUTES WITH JWT
 */
describe('2. Private routes with jwt', function () {
  test('Test 2.1: /apiv1/adverts with jwt returns 200', async () => {
    const response = await request(app).get('/apiv1/adverts').set('Authorization', jwt)
    expect(200)
    expect(response.body.success).toBe(true);
    // Primer anuncio
    advert = response.body.results[0];
  });

  test('Test 2.2: /apiv1/adverts/1231242 with jwt returns 200', async () => {
    const response = await request(app).get(`/apiv1/adverts/${advert._id}`).set('Authorization', jwt)
    expect(200)
    expect(response.body.success).toBe(true)
    expect(response.body.result.name === advert.name).toBe(true);
  });

  test('Test 2.3: /apiv1/adverts/tags with jwt returns 200', async () => {
    const response = await request(app).get('/apiv1/adverts/tags').set('Authorization', jwt)
    expect(200)
    expect(response.body.success).toBe(true)
  });
})

/**
* DISCONNECT FROM MONGO
*/
afterAll(done => {
  mongoose.connection.close();
  done();
})