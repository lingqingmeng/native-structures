'use strict'
var expect = require('chai').expect;
var Trie = require('./trie')
describe('Trie constructor',function (){

  describe("Trie#insert",function (){
  	it('should insert single item correctly',function (){
  		var trie = new Trie()
  		trie.insert("hello");
	   	trie.insert("heya")  
  	})
  })

  describe('Trie#search',function (){
    it('should search and return true',function (){
      var trie = new Trie()
      trie.insert("hello")
      trie.insert("world")
      var foundHello = trie.search('hello')
      var foundWorld = trie.search('world')
      var foundHell = trie.search('hell')
      expect(foundHello).to.be.true;
      expect(foundWorld).to.be.true;
      expect(foundHell).to.be.false
    })
    it('should search and also end early',function (){
      var trie = new Trie()
      trie.insert("hello")
      trie.insert("world")
      var foundEllo = trie.search('ello');
      expect(foundEllo).to.be.false
    })
  })

  describe('Trie#startsWith',function (){
    it('should start with hell',function(){
      var trie = new Trie()
      trie.insert('hello')
      var f = trie.startsWith('hell')
      expect(f).to.be.true
    })
  })
})
