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

describe('POST /api/users/me', () => {
  const defaultUser = new User({
    name: 'John Smith',
    username: 'johnsmither',
    email: 'john@example.com',
    password: '123456'
  });

  const profileInfo = {
    location: 'Windsor',
    bio: 'Hi there',
    twitter: 'mytwitter'
  };

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

  it('should get update current user information', function(done) {
    chai
      .request(server)
      .post('/api/users/me')
      .set('auth-token', jwt)
      .send(profileInfo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('username');
        res.body.username.should.equal('johnsmither');
        res.body.name.should.equal('John Smith');
        res.body.profile.location.should.equal('Windsor');
        res.body.profile.bio.should.equal('Hi there');
        done();
      });
  });
});
