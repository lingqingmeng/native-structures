'use strict'
var expect = require('chai').expect;
var HashMap = require('./hashMap')
describe('HashMap constructor',function (){
  describe('Prototype methods',function (){
    it('should say hello',function (){
      var hashMap = new HashMap();
      expect(hashMap.sayHello()).to.equal('My Life for Auir!')
    })
  })
})
