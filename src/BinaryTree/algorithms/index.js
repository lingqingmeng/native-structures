/**
 * Leetcode: https://leetcode.com/problems/same-tree/
 * Difficulty: Easy
 * Prompt: Given two binary trees, write a function to check if they are equal or not.
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
 module.exports = (function (){
 	'use strict'
 	
	//http://www.geeksforgeeks.org/write-c-code-to-determine-if-two-trees-are-identical/
	var isSameTree = function (p,q){
		// 1. Both empty -> return true
		if ((p === null) && (q === null)){
			return true
 		}

		// 2. Both non-empty -> Compare them
		else if ((p!== null) && ( q !== null)){
			var bool= ((p.val === q.val) && (
				isSameTree(p.left,q.left) &&
				isSameTree(p.right,q.right)	
			))
			return bool
		}

		// 3. one empty, one not -- false
		else if(( p !== null) && (q === null)){
 			return false
 		}else if ( (p === null) && (q !== null) ){
 			return false
 		}
	}

	/**
	 * Given an array of integers sorted in ascending order, find the starting and
	 * ending position of a given target value.
	 * Your algorithm's runtime complexity must be in the order of O(log n).
	 *
	 * https://leetcode.com/problems/search-for-a-range/
	 * @param {number[]} nums
	 * @param {number} target
	 * @return {number[]}
	 */
	var searchRange = function(nums, target) {};

	/** 
	 * Equivalent of underscore range
	 */
	var range = function (start,end) {
	 	if (typeof end == 'undefined'){
	 		end = start;
	 		start = 0;
	 	}
	 	var result = []
		for (var i = start; i < end; i++){ result.push(i)}
		return result;
	};

	function flatten(arr){
		var result = [].concat.apply([], arr);
		return result
	};

	/**
	 * Recursive helper for BinaryTree#constructor. Core mistake was trying to change 
	 * the array dynamically each step of the recursion. That will result in too many
	 * edge cases. Know that every step the middle element can be accessed with 
	 * start + (end - start) / 2
	 * 
	 * @param {Array} arr -> left or right partitions of original array from constructor
	 * @param {Number} start -> starting index 
	 * @param {Number} end -> ending index 
	 * @param {Function} TreeNode -> We are injecting the class to avoid circular dependencies
	 *
	 */

	var createChildTree = function(arr,start,end,TreeNode) {
		if (start > end) {
			return null
		}
		var mid = start +  Math.floor((end - start)/ 2 )
		var node = new TreeNode(arr[mid])
		node.left =  createChildTree(arr,start,mid-1,TreeNode)
		node.right = createChildTree(arr,mid+1,end,TreeNode)
		return node

	}




 	return {
 		isSameTree: isSameTree,
 		createChildTree: createChildTree,
 		range: range,
 		flatten: flatten
 	};
 })()