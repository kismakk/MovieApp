/* global describe, it, before */

require('dotenv').config();
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('Invite functionality', function () {
  const groupId = { groupId: 1 };
  let token;

  before(function () {
    token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  });

  describe('POST /groups/join (SENDING JOIN REQUEST TO GROUP)', function () {
    it('should return a status code of 201 and should return a message of "Invite posted successfully"', async function () {
      const groupId = { groupId: 2 };
      const res = await request(app)
        .post('/groups/join')
        .send(groupId)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Invite posted successfully');
    });

    it('should return a status code 403 if the user is not logged in', async function () {
      const res = await request(app)
        .post('/groups/join')
        .send(groupId);

      expect(res.status).to.equal(403);
      expect(res.body.error).to.equal('Not authorized');
    });

    it('should return an error if the user is already in the group', async function () {
      const res = await request(app)
        .post('/groups/join')
        .send(groupId)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('User is already in the group');
    });

    it('should return an error if the group ID is missing', async function () {
      const groupId = {};
      const res = await request(app)
        .post('/groups/join')
        .send(groupId)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Group ID is required');
    });

    it('should return an error if the user has already sent a request to join the group', async function () {
      const groupId = { groupId: 2 };
      const res = await request(app)
        .post('/groups/join')
        .send(groupId)
        .set('Cookie', [`uJwt=${token}`]);

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('User has already sent a request to join the group');
    });
  });
});
