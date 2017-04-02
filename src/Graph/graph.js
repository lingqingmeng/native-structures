module.exports = (function (){
  
  Object.map = function(o, f, ctx) {
    ctx = ctx || this;
    var result = {};
    Object.keys(o).forEach(function(k) {
        result[k] = f.call(ctx, o[k], k, o); 
    });
    return result;
  }

  var Node = require('./vertex')
  function Graph(matrix){
  	this.matrix = matrix
  	this.vertices = []
  	this.edges = {};
  	this.visited= []

  	for (var i = 0; i < matrix.length; i++){
  		var row = matrix[i]
  		for (var j =0; j < row.length; j++){
  			var node = new Node({x:i,y:j},row[j])
  			this.vertices.push(node)
  			this.edges[node.key()] = [] 
  		}
  	}
  	this.createEdges()
  }

  
  
  

  Graph.prototype.createEdges = function (){
  	for (var i =0; i < this.vertices.length; i++){
  		var v = this.vertices[i]
  		var res = this.findNeighbors(v.coord)
  		this.edges[v.key()] = res
  	}
  }

  /*
  word is ABCESEEEF
  for all edges where the key is an A, 
  */

  //removes edges based on constraint 
  Graph.prototype.removeEdges = function (word){

  }

  Graph.prototype.findNeighbors = function (coord){
  	var left = this.findVertex(leftOf(coord))
  	var right = this.findVertex(rightOf(coord))
  	var top = this.findVertex(above(coord))
  	var bot = this.findVertex(below(coord))
  	var adj =  [left,right,top,bot]
  	return adj.filter(function(node){
  		return (typeof node !== 'undefined')
  	})
  }

  Graph.prototype.findVertex = function (coord){
  	for (var i =0; i < this.vertices.length; i++){
  		var v = this.vertices[i]
  		if (v.equals(coord)){
  			return v
  		}
  	}
  	return 
  }  


  Graph.prototype.dfs = function (startingVertex, cb){ //next is a string character
    (function dfsRecurse(node,edges,visited){
      visited.push(node.key())
      var adj = edges[node.key()]
      cb(visited)
      for (var i in adj){  
        var node = adj[i]
        if (visited.indexOf(node.key()) < 0){
          dfsRecurse(node,edges,visited)       
        }
      }
    })(startingVertex,this.edges,[])
  }

 

  Graph.prototype.findVertexByValue = function (letter){
  	for (var i = 0 ; i < this.vertices.length; i++){
  		var v = this.vertices[i]
  		if (v.val == letter){
  			return v 
  		}
  	}
  	return 
  }

 

  
  Graph.prototype.logEdges = function (){
  	var toDisplay = Object.map(this.edges,function (edge,key,i){
      key = JSON.parse(key)
      return edge.map(function (v){
        var o =  {}
        o[v.val] = v.coord.x + ',' + v.coord.y
        return o
      });
    })
    var self = this
    Object.keys(toDisplay).map(function(key, index) {
      var kObj = JSON.parse(key)
      var currentLetter = self.matrix[kObj.x][kObj.y]
      console.log(currentLetter+': '+kObj.x + ',' + kObj.y + ' ' + JSON.stringify(toDisplay[key]))
      
    });
    console.log("")
  }


  
  Graph.prototype.sayHello = function (){
    return 'My Life for Auir!'
  }

  Graph.prototype.logVertices = function (){
  	for (var i =0; i< this.vertices.length; i++){
  		console.log(JSON.stringify(this.vertices[i].coord),this.vertices[i].val)
  	}
  }


  
  function above(coord){
  	return {
  		x: coord.x -1,
  		y: coord.y
  	}
  }

  function below(coord){
  	return {
  		x: coord.x +1,
  		y: coord.y
  	}
  }

  function leftOf(coord){
  	return {
  		x: coord.x,
  		y: coord.y -1
  	}
  }

  function rightOf(coord){
  	return {
  		x: coord.x,
  		y: coord.y + 1
  	}
  }
  return Graph
})()
