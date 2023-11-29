/* global describe, it, before */
require('dotenv').config();
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('Group functionality', function () {
  const group = { groupName: 'test', groupDescription: 'This is a test description' };
  let token;
  const userId = 2; // Add a user to the database before running the tests, then add the userId here

  before(function () {
    token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  });

  describe('POST /groups/create', function () {
    it('should return a status code of 201 and should return a message of "Group created successfully"', async function () {
      const res = await request(app)
        .post('/groups/create')
        .send(group)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Group created successfully');
    });

    it('should return a status code 403 if the user is not logged in', async function () {
      const res = await request(app)
        .post('/groups/create')
        .send(group);

      expect(res.status).to.equal(403);
      expect(res.body.error).to.equal('Not authorized');
    });

    it('shouldn\'t create a group if the group name is already in use', async function () {
      const res = await request(app)
        .post('/groups/create')
        .send(group)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Group already exists');
    });

    it('should return an error if the group name is missing', async function () {
      const group = { groupDescription: 'This is a test description' };
      const res = await request(app)
        .post('/groups/create')
        .send(group)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Group name is required');
    });

    it('should return an error if the group name is an empty string', async function () {
      const group = { groupName: '', groupDescription: 'This is a test description' };
      const res = await request(app)
        .post('/groups/create')
        .send(group)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Group name is required');
    });

    it('should return userId and groupId in the response', async function () {
      const group = { groupName: 'test2', groupDescription: 'This is a test description' };
      const res = await request(app)
        .post('/groups/create')
        .send(group)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Group created successfully');
      expect(res.body.group.id_groups).to.be.a('number');
      expect(res.body.userId).to.be.a('number');
    });
  });
});
