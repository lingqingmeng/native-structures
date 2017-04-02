module.exports = (function (){
  function Vertex(coord,val){
  	this.coord = coord;
  	this.val = val
  }

  Vertex.prototype.equals = function (coord){
  	return ((this.coord.x == coord.x) && (this.coord.y === coord.y))
  }

  Vertex.prototype.key = function (){
  	return JSON.stringify(this.coord)
  }
  
  Vertex.prototype.sayHello = function (){
    return 'My Life for Auir!'
  }
  return Vertex
})()
