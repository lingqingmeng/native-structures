module.exports = (function (){
	function Node(value) {
		this.value = value;
		this.next = null; //while implemented, these would be references to other nodes that are next or prev to this one
		this.prev = null;
	}

	return Node
})()