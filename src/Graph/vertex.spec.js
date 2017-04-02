'use strict'
var expect = require('chai').expect;
var Vertex = require('./vertex')
describe('Vertex constructor',function (){
  describe('Prototype methods',function (){
    it('should say hello',function (){
      var vertex = new Vertex();
      expect(vertex.sayHello()).to.equal('My Life for Auir!')
    })
  })
})
