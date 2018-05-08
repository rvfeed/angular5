var request = require("request"),
    assert = require('assert'),
    helloWorld = require("./server.js"),
    base_url = "http://localhost:9090/";

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(response.statusCode).toBe(200);
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(body).toBe("Hello World");
        assert.equal("welcome Home!", body);
     //   helloWorld.closeServer();
        done();
      });
    });
       it("returns readAllPosts", function(done) {
      request.get(base_url+"readAllPosts", function(error, response, body) {
        //expect(body).toBe("Hello World");
        assert.equal("welcome Home!", body);
     //   helloWorld.closeServer();
        done();
      });
    });
  });
});