'use strict';

var expect = require('chai').expect;
describe('BSTIterator constructor',function (){
  var TreeNode = require('./treeNode')
  var BSTIterator = require('./bstIterator')
  describe('Prototype methods',function (){
    it('should pass for base case',function (){
      var root = initSingleNode()
      var iter = new BSTIterator(root);
      expect(iter.hasNext()).to.be.true
    })

  })

  function initSingleNode(){
    var a = new TreeNode(10);
    return a
  }
  function initNodes(){
    var a = new TreeNode(50)
    var b = new TreeNode(10)
    var c = new TreeNode(90)
    var d = new TreeNode(5)
    var e = new TreeNode(15)
    var f = new TreeNode(70)
    var g = new TreeNode(120)
    c.left = f 
    c.right = g
    b.left = d 
    b.right = e 
    a.left = b;
    a.right = c;
    return a
  }
})

