'use strict'
var expect = require("chai").expect;
var Queue = require('./queue')
describe("Queue constructor",function (){
  describe("Prototype methods",function (){
    it("should say hello",function (){
      var mq = new Queue();
      expect(mq.sayHello()).to.equal('hello from queue')  
    })
  })

  describe("Queue#isEmpty",function (){
    it("should inherit from DLL.isEmpty",function (){
      var mq = new Queue();
      expect(mq.isEmpty()).to.equal(true);
    })
  })

  describe("Queue#push",function (){
    it("should add elements to end of queue",function (){
      var mq = new Queue();
      expect(mq.length).to.equal(0);
      mq.push(3)
      expect(mq.length).to.equal(1);
    })
  })

  describe("Queue#peek",function (){
    it("should get the 0th index of elements list",function (){
      var mq = new Queue();
      expect(mq.peek()).to.be.an("undefined")
      mq.push(13);
      expect(mq.peek()).to.be.an("object");
      expect(mq.peek().value).to.equal(13);
    })
  })
  
})