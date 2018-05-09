var request = require("request");
var chai = require('chai');
//process.env.NODE_ENV = "test";
var app = require("../server.js");
var assert =  require("assert");
 var base_url = "http://localhost:9091";
let expect = chai.expect;
describe('Todos list API Integration Tests', function() {
  describe('#GET / tasks', function() { 
    it('should get all tasks', function(done) { 
      request.get(base_url+"/readAllPosts", function(error, response, body) {
      
     //   .end(function(err, res) { 
           assert.equal(200, response.statusCode);
         // expect(res.body).to.be.an('array');
         console.log("body",body) 
       //   expect(res.body).to.be.empty; 
          done(); 
    //    }); 
    });
  });
});
});