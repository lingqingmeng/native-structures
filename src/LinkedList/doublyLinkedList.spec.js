'use strict'
var expect = require("chai").expect;
var DoublyLinkedList = require('./doublyLinkedList')
describe("Doubly Linked List",function (){
  describe("Constructor test",function (){
    it("should say hello",function (){
      var dll = new DoublyLinkedList();
      expect(dll).to.be.an('object')  
      expect(dll.len).to.equal(0);
      expect(dll.length).to.equal(0);
    })
  })

  describe("DoublyLinkedList#Add",function(){
    it("should add one node properly",function (){
      var dll = new DoublyLinkedList();
      dll.add(3);
      expect(dll.head.value).to.equal(3);
      expect(dll.head.next).to.equal(null)
    })

    it("should add multiple nodes properly",function (){
      var dll = new DoublyLinkedList();
      dll.add(9);
      dll.add(1);
      dll.add(3);
      expect(dll.len).to.equal(3);
      var head = dll.head
      expect(head.next.value).to.equal(1);
      expect(dll.tail.value).to.equal(3);
    })
  })

  describe("DoublyLinkedList#isEmpty",function(){
    it("should be empty",function (){
      var dll = new DoublyLinkedList();
      expect(dll.isEmpty()).to.equal(true);
      dll.add(2)
      expect(dll.isEmpty()).to.equal(false);
    })
  })


})