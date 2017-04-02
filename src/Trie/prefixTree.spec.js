'use strict'
var expect = require('chai').expect;
var PrefixTree = require('./prefixTree')
describe('PrefixTree constructor',function (){
  describe('Prototype methods',function (){
    it('should say hello',function (){
      var pt = new PrefixTree();
      expect(pt.sayHello()).to.equal('My Life for Auir!')
    })
  })
})
