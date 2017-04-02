'use strict'
var expect = require("chai").expect;
var CircularLinkedList = require('./circularLinkedList')
describe("Circlular Linked List suite",function (){
  describe("Constructor test",function (){
  	it('should add nodes in circle',function (){
  		var cll = new CircularLinkedList()
  		cll.add(0).add(1).add(2).add(3).add(4)
  		expect(cll.len).to.equal(5)
  	})
    it("should say hello",function (){
      var dll = new CircularLinkedList();
      expect(dll).to.be.an('object')  
      expect(dll.len).to.equal(0);
      expect(dll.length).to.equal(0);
    })
  })

  describe("CLL Iterator",function (){
  	it('should move forward',function (){
  		var cll = new CircularLinkedList()
  		cll.add(0).add(1).add(2).add(3).add(4)
  		var curr = cll.head
  		expect(curr.value).to.equal(0)
  		curr = curr.next
  		expect(curr.value).to.equal(1)
  	})
  	it('should circuluate',function (){
  		var i = 0
  		var cll = new CircularLinkedList()
  		cll.add(1).add(2).add(3).add(4).add(5)
  		var curr = cll.head
  		while (cll.nextNodeThenGetValue() &&  (i < 22)){
  			i++
  		}
  	})
  })

  


})