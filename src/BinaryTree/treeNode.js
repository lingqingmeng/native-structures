module.exports = (function (){
	function TreeNode(val) {
		this.val = val;
		this.left = this.right = null;

	}

	/*
	Given a binary tree, determine if it is a valid binary search tree (BST).
	Assume a BST is defined as follows:

	The left subtree of a node contains only nodes with keys less than the node's key.
	The right subtree of a node contains only nodes with keys greater than the node's key.
	Both the left and right subtrees must also be binary search trees.
	*/
	TreeNode.prototype.isValidBST = function (node){
		
		
		var curr = node;
		if (typeof node == 'undefined'){
			curr = this
		}
		return isValid(curr,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY)

		//helper function with bounds
		function isValid(curr,min,max){
			// base case its a leaf
			if ((curr.left === null ) && (curr.right === null)){
				return ((min < curr.val) && (max > curr.val))
			}

			// case has both children check children then go down
			else if ((curr.left !== null) && (curr.right !== null)) {
				return ( ((min < curr.val) && (max > curr.val)) &&
					isValid(curr.left,min,curr.val) &&
					isValid(curr.right,curr.val,max)
				)
			}

			// only left child is TreeNode
			else if ((curr.left !== null) && (curr.right === null)){
					
				return ((min < curr.val) &&
					(curr.left.val < curr.val) && 
					isValid(curr.left,min,curr.val)
				)
			}

			else if ((curr.right !== null) && (curr.left === null)) {
				return ((max > curr.val) &&
					(curr.right.val > curr.val) &&
					isValid(curr.right,curr.val,max)
				)
			}else {
				console.log("never hit here")
			}
		}
	}


	return TreeNode
})()