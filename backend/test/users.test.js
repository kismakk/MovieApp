/**
 * @fileoverview This file contains tests for the userController functions.
 * At the moment it includes tests for creating a new user, signing in a user, and signing out a user.
 * The tests use the supertest library to make HTTP requests to the app and chai library for assertions.
 * The app is imported from '../app' and the database connection pool is imported from '../config/connection'.
 * The tests are organized using the describe and it functions from the Mocha testing framework.
 * The before function is used to delete all data from the users table and reset the id_users sequence before testing.
 * Each test case sends an HTTP request to the corresponding route and asserts the response status and message.
 */

/* global describe, it, before, after */

/* These are tests for all the functions in userController**/

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app'); // path to your app
const pgPool = require('../config/connection');

describe('User Controller', function () {
  let token;
  // Delete all data from the users table and reset the id_users sequence before testing
  before(function (done) {
    // Delete all data from the users table
    pgPool.query("DELETE FROM users WHERE uname = 'testing'", (err) => {
      if (err) throw err;
      done();
    });
  });

  after(function (done) {
    pgPool.end();
    done();
  });

  describe('POST /createUser', function () {
    it('should create a new user', function (done) {
      const user = { uname: 'testing', pw: 'test', email: 'testing@test.com' };
      request(app) // this is the supertest object to make HTTP requests
        .post('/users/signup') // send a POST request to the /users/signup route
        .send(user) // send the user object as the request body
        .end((_err, res) => {
          expect(res.status).to.equal(201); // assert that the response status is 201
          expect(res.body.message).to.equal('User created successfully'); // assert that the response message is 'User created successfully'
          done();
        });
    });

    it('should return error if data is missing', function (done) {
      const user = { uname: 'test1', pw: 'test' };
      request(app)
        .post('/users/signup')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Missing required fields');
          done();
        });
    });

    it('should return error if email is already in use', function (done) {
      const user = { uname: 'test2', pw: 'test', email: 'testing@test.com' };
      request(app)
        .post('/users/signup')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Email already in use');
          done();
        });
    });

    it('should return error if email is invalid', function (done) {
      const user = { uname: 'test3', pw: 'test', email: 'test' };
      request(app)
        .post('/users/signup')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Invalid email');
          done();
        });
    });

    it('should return error if username is already in use', function (done) {
      const user = { uname: 'testing', pw: 'test', email: 'test@test.com' };
      request(app)
        .post('/users/signup')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Username already in use');
          done();
        });
    });
  });

  describe('POST /signin', function () {
    it('should sign in a user', function (done) {
      const user = { uname: 'testing', pw: 'test' };
      request(app)
        .post('/users/signin')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User signed in successfully');
          // Save the token for later use (token name is uJwt)
          token = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
          done();
        });
    });

    it('should return error if user is not found', function (done) {
      const user = { uname: 'nofound', pw: 'test' };
      request(app)
        .post('/users/signin')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('User not found');
          done();
        });
    });

    it('should return error if password is incorrect', function (done) {
      const user = { uname: 'testing', pw: 'test2' };
      request(app)
        .post('/users/signin')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Invalid credentials');
          done();
        });
    });
  });

  describe('PUT /edit', function () {
    it('should update a user', function (done) {
      const user = { fname: 'testing', lname: 'test' };
      request(app)
        .put('/users/edit')
        .send(user)
        .set('Cookie', [`uJwt=${token}`])
        .end((_err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User edited successfully');
          done();
        });
    });

    it('should return error if user is not authenticated', function (done) {
      const user = { fname: 'testing', lname: 'test' };
      request(app)
        .put('/users/edit')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.error).to.equal('Not authorized');
          done();
        });
    });

    it('should return error if data is missing', function (done) {
      const user = {};
      request(app)
        .put('/users/edit')
        .send(user)
        .set('Cookie', [`uJwt=${token}`])
        .end((_err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('No data to update');
          done();
        });
    });
  });

  describe('DELETE /delete', function () {
    it('should delete a user', function (done) {
      request(app)
        .delete('/users/delete')
        .set('Cookie', [`uJwt=${token}`])
        .end((_err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User deleted successfully');
          done();
        });
    });

    it('should return a error if user is not authenticated', function (done) {
      request(app)
        .delete('/users/delete')
        .end((_err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.error).to.equal('Not authorized');
          done();
        });
    });
  });

  describe('POST /signout', function () {
    it('should sign out a user', function (done) {
      request(app)
        .post('/users/signout')
        .end((_err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Logged out successfully');
          expect(() => expect(res.headers['set-cookie'][0].split(';')[0].split('=')[1]).to.be.undefined()); // Add this assertion to check if the token is removed
          done();
        });
    });
  });
});
