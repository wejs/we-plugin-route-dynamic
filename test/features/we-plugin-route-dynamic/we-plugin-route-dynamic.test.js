var assert = require('assert');
var request = require('supertest');
var helpers = require('we-test-tools').helpers;
var stubs = require('we-test-tools').stubs;
var async = require('async');
var _ = require('lodash');
var http;
var we;
var agent;

function routeStub(controller, model) {
 return {
    method: 'get',
    path: '/route123131',
    controller: '',
    action: '',
    model: '',
    responseType: null,
    permission: null
 };
}

function stubController() {
  return function(req, res, next) {
    next();
  }
}

describe('we-plugin-route-dynamicFeature', function() {
  var salvedUser, salvedUserPassword, authenticatedRequest;

  before(function (done) {
    http = helpers.getHttp();
    agent = request.agent(http);

    we = helpers.getWe();

    var userStub = stubs.userStub();
    helpers.createUser(userStub, function(err, user) {
      if (err) throw err;

      salvedUser = user;
      salvedUserPassword = userStub.password;

      // login user and save the browser
      authenticatedRequest = request.agent(http);
      authenticatedRequest.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: salvedUser.email,
        password: salvedUserPassword
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err) {

        we.controllers.test = stubController();

        done(err);
      });
    })
  });

  describe('API', function () {
    it ('post /api/v1/route/ should create one route and bind route in current express server', function (done) {

      var r = {
        method: 'get',
        path: '/route-test',
        controller: 'user',
        action: 'find',
        model: 'user',
        responseType: 'json',
        permission: null
     };

      authenticatedRequest.post('/api/v1/route')
      .send(r)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);

        assert(res.body.route);
        assert( _.isArray(res.body.route) , 'route not is array');
        assert(res.body.meta);
        assert(res.body.route[0].id);
        assert.equal(res.body.route[0].method, r.method);
        assert.equal(res.body.route[0].controller, r.controller);

        request(http).get(r.path)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          // return user array in custom route
          assert(res.body.user);
          assert( _.isArray(res.body.user) , 'user not is array');
          assert(res.body.meta);
          assert(res.body.meta.count);

          done();
        });
      });
    });
  });
});