'use strict'
var expect = require('chai').expect;
var DeferredQ = require('./deferredQ')
describe('DeferredQ constructor',function (){
  describe('Prototype methods',function (){
    it('should say Bob after some time',function (done){
      function foo(email){
        return new DeferredQ(function (resolve,reject){
          func1(email,function (data){
            resolve(data)
          })
        })
      }
      foo('bob@gmail.com').then(function (res){
        res.statement = res.name + "'s email address is " + res.email 
        return res
      }).then(function (res){
        console.log("res: ",res)
        expect(res.name).to.equal('Bob')
        expect(res.statement).to.equal("Bob's email address is bob@gmail.com")
        done()
      })
    }).timeout(800)
  })
})

var func1 = function(email,cb) { // Make AJAX call.
  setTimeout(function() { // Wait for the internet.
    var obj = {name: 'Bob'}
    obj.email = email
    cb(obj); // Return response.
  }, 400);
};