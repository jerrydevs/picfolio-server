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

describe('POST /api/auth', () => {
  const defaultUser = new User({
    name: 'John Smith',
    username: 'johnsmither',
    email: 'john@example.com',
    password: '123456'
  });

  before(done => {
    authenticatedUser
      .post('/api/users')
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  afterEach(async function() {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.remove();
    }
  });

  it('should login an existing user', function(done) {
    chai
      .request(server)
      .post('/api/auth')
      .send({
        email: 'john@example.com',
        password: '123456'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});
