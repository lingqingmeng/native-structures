'use strict'
var expect = require('chai').expect;
var Graph = require('./graph')
var Vertex = require('./vertex')
describe('Graph prototype nmethods',function (){
  describe('Graph#constructor',function (){
    it('should construct',function (){
      var M = initMatrix()
      var graph = new Graph(M);
      
    })

  })

  describe("Graph#findVertex",function (){
  	it("should find a vertex",function (){
  		var M = initMatrix()
      var graph = new Graph(M);
      var f = graph.findVertex({x:1,y:1})
      var e = graph.findVertex({x:2,y:2})
      var s = graph.findVertex({x:1,y:3})
  		expect(f.val).to.equal('F')
  		expect(e.val).to.equal('E')
  		expect(s.val).to.equal('S')
  	})

  	it("should not find a vertex and return undefined",function(){
  		var M = initMatrix()
      var graph = new Graph(M);
      var f = graph.findVertex({x:-1,y:0})
      expect(f).to.be.undefined
  	})

  	
  })

  describe("Graph#findNeighbors",function(){
  	it("should find neighbors",function(){
  		var M = initMatrix()

      var graph = new Graph(M);
      var naybs = graph.findNeighbors({x:1,y:1})
      expect(naybs.length).to.equal(4)
  	})
  	it("should find neighbors",function(){
  		var M = initMatrix()

      var graph = new Graph(M);
      var naybs = graph.findNeighbors({x:0,y:0})
      expect(naybs.length).to.equal(2)
      expect(naybs[0].val).to.equal('B')
      expect(naybs[1].val).to.equal('S')

      naybs = graph.findNeighbors({x:1,y:3})
      expect(naybs.length).to.equal(3)


  	})
  })

  describe("Graph#createEdges",function(){
  	it("should find all edges",function (){
  		var M = initMatrix()
  		var graph = new Graph(M)

  	})
  	it("should find edges for v given key",function (){
  		var M = initMatrix()
  		var graph = new Graph(M)
      var v = new Vertex({x:1,y:1})
      var adj = graph.edges[v.key()]
      expect(adj.length).to.equal(4)
      var visited = []
      for (var i in adj){
      	visited.push(adj[i].key())	
      }
      var exists = visited.indexOf(v.key()) < 0
      expect(exists).to.be.true
      
      v = new Vertex({x:1,y:0})
      exists = visited.indexOf(v.key()) < 0
      expect(exists).to.be.false 

      v = new Vertex({x:2,y:1})
      exists = visited.indexOf(v.key()) < 0
      expect(exists).to.be.false 
    })
  })

  describe("contains",function (){
  	it("should run without errors",function (){
  		var A = initAlternateMatrix()
      var graph = new Graph(A)
      var v = graph.vertices[1]

      
  	})
  })

  


 
})


function initMatrix(){
	return [['A','B','C','E'],
			         ['S','F','C','S'],
			         ['A','D','E','E']
		  ]
} 

function initAlternateMatrix(){
  return [['W','X'],['Y','Z']]
}
