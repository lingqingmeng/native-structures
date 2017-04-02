//requires  queue
module.exports = (function (){
  'use strict'

  var DoublyLinkedList = require('../LinkedList/doublyLinkedList')
  function Queue() {
    this._elements = new DoublyLinkedList()
    this.sayHello = function (){
      return "hello from queue"
    }

    // Read-only length property
    Object.defineProperty(this, 'length', {
      get: function() {
        return this._elements.length;
      }.bind(this)
    });
  }


  Queue.prototype.isEmpty = function (){//testing proto. inheritance
    return this._elements.isEmpty();
  }

  /**
   * Adds element, a node value, to the end of the queue
   */
  Queue.prototype.push = function(e) {
    this._elements.add(e);
  };

  Queue.prototype.peek = function (){
    if (this.isEmpty()) { return undefined;}
    return this._elements.head
  }

  return Queue
})()