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

describe('GET /api/users/search/:searchTerm', () => {
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

  after(async function() {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.remove();
    }
  });

  it('should find a user by name', function(done) {
    chai
      .request(server)
      .get('/api/users/search/john')
      .end((err, res) => {
        res.should.have.status(200);
        const johnSmith = res.body[0];
        johnSmith.should.have.property('username');
        johnSmith.username.should.equal('johnsmither');
        johnSmith.name.should.equal('John Smith');
        done();
      });
  });

  it('should find a user by username', function(done) {
    chai
      .request(server)
      .get('/api/users/search/smither')
      .end((err, res) => {
        res.should.have.status(200);
        const johnSmith = res.body[0];
        johnSmith.should.have.property('username');
        johnSmith.username.should.equal('johnsmither');
        johnSmith.name.should.equal('John Smith');
        done();
      });
  });
});
