const assert = require('assert');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');

const server = require('../../testServer');
const should = chai.should();

const User = require('../../models/user');
const authenticatedUser = request.agent(server);

chai.use(chaiHttp);

describe('DELETE /api/users', () => {
  const defaultUser = new User({
    name: 'John Smith',
    username: 'johnsmither',
    email: 'john@example.com',
    password: '123456'
  });

  let jwt;

  before(done => {
    mongoose.connection.collections.users.drop();
    authenticatedUser
      .post('/api/users')
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(200);
        jwt = res.body.token;
        done();
      });
  });

  afterEach(async function() {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.remove();
    }
  });

  it('should delete an existing user', function(done) {
    chai
      .request(server)
      .delete('/api/users')
      .set('auth-token', jwt)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
