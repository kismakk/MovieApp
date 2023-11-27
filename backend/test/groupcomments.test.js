const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app.js'); // path to your app
const pgPool = require('../config/connection');

/* global describe, it, before, after */

describe('Comment Controller', () => {
  let token;

  before(async () => {
    await pgPool.query('DELETE FROM group_comments');
    await pgPool.query('ALTER SEQUENCE group_comments_id_comments_seq RESTART WITH 1');
    const user = { uname: 'test', pw: 'test', email: 'test@test.com' };
    const signUpResponse = await request(app)
      .post('/users/signup')
      .send(user);
    expect(signUpResponse.status).to.equal(201);
    expect(signUpResponse.body.message).to.equal('User created successfully');

    const userCredentials = { uname: 'test', pw: 'test' };
    const signInResponse = await request(app)
      .post('/users/signin')
      .send(userCredentials);
    expect(signInResponse.status).to.equal(200);
    expect(signInResponse.body.message).to.equal('User signed in successfully');
    token = signInResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];
  });

  after(async () => {
    await pgPool.query('DELETE FROM group_comments');
  });

  describe('POST /comments/comment', () => {
    it('Should successfully post a comment', async () => {
      const commentData = {
        id_groups: '1',
        id_users: '1',
        user_comments: 'This is a test comment'
      };
      const response = await request(app)
        .post('/comments/comment')
        .set('Cookie', [`uJwt=${token}`])
        .send(commentData);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Comment posted');
      expect(response.body.postComments).to.be.an('object');
    });
    it('Should return an error for unauthorized user', async () => {
      const commentData = {
        id_groups: '1',
        id_users: '1',
        user_comments: 'This is a test comment'
      };
      const response = await request(app)
        .post('/comments/comment')
        .send(commentData);

      expect(response.status).to.equal(403);
      expect(response.body.error).to.equal('Not authorized');
    });
  });

  describe('GET /comments', () => {
    it('Should successfully get comments', async () => {
      const groupId = 1;
      const response = await request(app)
        .get('/comments')
        .set('Cookie', [`uJwt=${token}`])
        .query({ id_groups: groupId });

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Success');
    });
    it('Should return an error for unauthorized user', async () => {
      const groupId = 1;
      const response = await request(app)
        .get('/comments')
        .set('Cookie', ['uJwt=invalidToken'])
        .query({ id_groups: groupId });

      expect(response.status).to.equal(403);
      expect(response.body.error).to.equal('Not authorized');
    });
    it('Should have no comments for a group', async () => {
      const groupId = 2;
      const response = await request(app)
        .get('/comments')
        .set('Cookie', [`uJwt=${token}`])
        .query({ id_groups: groupId });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('No comments found for your group');
    });
  });

  describe('DELETE /comments/delete/:id', () => {
    it('Should successfully delete a comment', async () => {
      const commentId = 1;
      const deleteCommentResponse = await request(app)
        .delete(`/comments/delete/${commentId}`)
        .set('Cookie', [`uJwt=${token}`]);

      expect(deleteCommentResponse.status).to.equal(200);
      expect(deleteCommentResponse.body.message).to.equal('Comment deleted successfully');
    });
    it('Should return an error for unauthorized user', async () => {
      const commentId = 1;
      const deleteCommentResponse = await request(app)
        .delete(`/comments/delete/${commentId}`)
        .set('Cookie', ['uJwt=invalidToken']);

      expect(deleteCommentResponse.status).to.equal(403);
      expect(deleteCommentResponse.body.error).to.equal('Not authorized');
    });
    it('Should return an error for not being able to delete other peoples comments', async () => {
      const commentId = 1;
      const userId = 2;
      const deleteCommentResponse = await request(app)
        .delete(`/comments/delete/${commentId}`)
        .set('Cookie', [`uJwt=${token}`])
        .query({ userId });

      expect(deleteCommentResponse.status).to.equal(404);
      expect(deleteCommentResponse.body.error).to.equal('Comment not found or you do not have permission to delete it');
    });
  });
});
