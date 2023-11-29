const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app.js'); // path to your app
const pgPool = require('../config/connection');

describe('Review Controller', () => {
  let token;

  before(async () => {
    await pgPool.query('DELETE FROM reviews');
    await pgPool.query('ALTER SEQUENCE reviews_id_reviews_seq RESTART WITH 1');
    const user = { username: 'test', score: 'test', review: 'test', time: '2023-11-28T12:00:00.000Z', idMovie: 1 };
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
    await pgPool.query('DELETE FROM reviews');
  });

  describe('POST /reviews', () => {
    it('Should successfully post a review', async () => {
      const reviewData = {
        username: 'test',
        score: 5,
        review: 'This is a test review',
        time: '2023-11-28T12:00:00.000Z',
        idMovie: 1,
        idSeries: null,
      };
      const response = await request(app)
        .post('/reviews')
        .set('Cookie', [`uJwt=${token}`])
        .send(reviewData);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Review created successfully');
    });
    it('Should return an error for unauthorized user', async () => {
      const reviewData = {
        username: 'test',
        score: 5,
        review: 'This is a test review',
        time: '2023-11-28T12:00:00.000Z',
        idMovie: 1,
        idSeries: null,
      };
      const response = await request(app)
        .post('/reviews')
        .send(reviewData);

      expect(response.status).to.equal(403);
      expect(response.body.error).to.equal('Not authorized');
    });
  });

  describe('GET /reviews', () => {
    it('Should successfully get reviews', async () => {
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

  describe('DELETE /review/delete/:id', () => {
    it('Should successfully delete a a review', async () => {
      const reviewId = 1;
      const deleteReviewResponse = await request(app)
        .delete(`/review/delete/${reviewId}`)
        .set('Cookie', [`uJwt=${token}`]);

      expect(deleteReviewResponse.status).to.equal(200);
      expect(deleteReviewResponse.body.message).to.equal('Review deleted successfully');
    });
    it('Should return an error for unauthorized user', async () => {
      const reviewId = 1;
      const deleteReviewResponse = await request(app)
        .delete(`/reviews/delete/${reviewId}`)
        .set('Cookie', ['uJwt=invalidToken']);

      expect(deleteReviewResponse.status).to.equal(403);
      expect(deleteReviewResponse.body.error).to.equal('Not authorized');
    });
    it('Should return an error for not being able to delete other peoples reviews', async () => {
      const reviewId = 1;
      const userId = 2;
      const deleteReviewResponse = await request(app)
        .delete(`/review/delete/${commentId}`)
        .set('Cookie', [`uJwt=${token}`])
        .query({ userId });

      expect(deleteReviewResponse.status).to.equal(404);
      expect(deleteReviewResponse.body.error).to.equal('Review not found or you do not have permission to delete it');
    });
  });
});
