module.exports = (function (){
	'use strict'
	var isSameTree = require('./algorithms/index').isSameTree
	var createChildTree = require ('./algorithms/index').createChildTree
	var range = require('./algorithms/index').range
	var flatten = require('./algorithms/index').flatten
	var TreeNode = require('./treeNode')
	function BinaryTree(sortedList){
		if (typeof sortedList === 'undefined'){  this.root = null; return		}
		this.root = createChildTree(sortedList,0,sortedList.length-1,TreeNode)
	}

	//IN: TreeNode
	//OUT: Will do inorder traversal
	BinaryTree.prototype.traverse = function (callback,options){
		function inOrder(node,depth){
			if (node.left !== null) { inOrder(node.left,depth+1)}
			callback.call(this,node,depth)
			if (node.right !== null){ inOrder(node.right,depth+1);}
		}
		function preOrder(node,depth){
			callback.call(this,node,depth)
			if (node.left !== null) { preOrder(node.left,depth+1)}
			if (node.right !== null){ preOrder(node.right,depth+1);}
		}

		if (options == 'preorder'){
			preOrder(this.root,0)
		}else if (options == 'inorder'){
			inOrder(this.root,0)
		}else {
			inOrder(this.root,0);	
		}
		
	} 



	BinaryTree.prototype.toArray = function (){
		var res = []
		this.traverse(function (node){
			res.push(node.val)
		})
		return res;
	}

	BinaryTree.prototype.isValidBST = function (){
		if (this.root === null){ return true;}
		return this.root.isValidBST()
	}

	
	BinaryTree.prototype.traverseVertical = function () {
		if (this.root === null) return [];
    let [min, max] = getRange(this.root, [0, 0], 0);
    let queue = [];
    let result = Array(max - min + 1).fill().map(() => Array());
    queue.push([0, this.root]);
    while(queue.length !== 0) {
        let [curIdx, curNode] = queue.shift();
        result[curIdx - min].push(curNode.val);
        curNode.left !== null && queue.push([curIdx - 1, curNode.left]);
        curNode.right !== null && queue.push([curIdx + 1, curNode.right]);
    }
    return result;
		function getRange (root, range, col)  {
		  if (root === null) {
		    return range;
		  }
		  range = [Math.min(range[0], col), Math.max(range[1], col)];
		  range = getRange(root.left, range, col-1);
		  range = getRange(root.right, range, col+1);
		  return range;
		}
	}

	BinaryTree.prototype.visualize = function (){
		function printVerticalLine(node,lineNumber,horizontalDistance){
			if (node === null) return; //base case
			if (horizontalDistance == lineNumber){console.log(node.val)} //if node is currently on same line number
			printVerticalLine(node.left,lineNumber,horizontalDistance-1)
			printVerticalLine(node.right,lineNumber,horizontalDistance+1)
		}

		//put this in algorithms
		

		function findMinMax(tree,positions,hd){
			if (tree === null) { return}
			if (hd < positions[0]){ positions.unshift(hd)} //keep the head of min list smallest
			else if (hd > positions[positions.length-1]){positions.push(hd)} //keep the tail of max list largest
			findMinMax(tree.left,positions,hd-1)
			findMinMax(tree.right,positions,hd+1)
			return positions
		}

		function printVertical(positions,vo,bounds,node){
			console.log("positions: ",positions)
			console.log("vo: ",vo)
			var done = vo.reduce((memo,num) => memo + num.length,0)
			if (done === 0){ return}
			var feed = []
			for (let i =0; i < positions.length; i++){
				var p = positions[i]
				var popped = vo[p].shift()
				feed.push(popped)	
			}
			console.log(feed.join(' '))
			var levels = positions.map(p => [p-1,p+1].filter(pos => typeof vo[pos] !== 'undefined'))
			var other = flatten(levels).filter((item, pos, self) => self.indexOf(item) == pos )
			console.log("other: ",other)
			printVertical(other,vo,bounds)

		}
		
		let pos = [0]//min and max distances w resp to root
		var bounds = findMinMax(this.root,pos,0);
		var vo = this.traverseVertical()
		var feed = {}
		this.traverse(function (node,depth){
			feed[depth] = feed[depth] || new Array( (bounds[bounds.length-1] - bounds[0])*2 ).join(' ');
			for (let i =0; i < vo.length; i++){
				if (vo[i].includes(node.val)){
					var position = bounds[i]*2
					if (position >= 0){
						var str = new Array( position + 1).join(' '); //left spaces
						str += node.val.toString()
						feed[depth] += str
					}else if (position < 0){
						feed[depth] = feed[depth].slice(0,position)
						var str = new Array( -position + 1 ).join(' ');
						feed[depth] += node.val.toString()	+  str
					}
				}
			}
		},'preorder')
		var f =Object.keys(feed).map(k => {
			console.log(feed[k])
			console.log("")
			console.log("")
		})
		// printVertical([1],vo,bounds,this.root)
	}
	/*printVerticalLine(tree, line_no, hd)
     if tree is NULL then return;
 
     if hd is equal to line_no, then
           print(tree->data);
     printVerticalLine(tree->left, line_no, hd-1);
     printVerticalLine(tree->right, line_no, hd+1); */


	BinaryTree.prototype.isSameTree = isSameTree
	
	


	;
	return BinaryTree;
})()