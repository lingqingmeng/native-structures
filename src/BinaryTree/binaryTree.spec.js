'use strict'
var expect = require("chai").expect;
var BinaryTree = require('./binaryTree')
var TreeNode = require('./treeNode')
describe("BinaryTree suite",function (){
	describe("BinaryTree#constructor",function (){
		it("should have a root of null",function (){
			var bt = new BinaryTree()
			expect(bt.root).to.be.a('null')
		})

		it("should construct from array of 1",function (){
			var bt = new BinaryTree([3])
			expect(bt.root.val).to.equal(3)
			var mybt = new BinaryTree([0])
			expect(mybt.root.val).to.equal(0)
			console.log('mybt: ',mybt)
		})
		it("should construct from sorted array",function (){
			var bt = new BinaryTree([1,2,3])
			expect(bt.root.val).to.equal(2)
			expect(bt.root.left.val).to.equal(1)
			expect(bt.root.right.val).to.equal(3)
		})
		it("should construct even number length",function (){
			var bt = new BinaryTree([1,2])
			expect(bt.root.val).to.equal(1)
			expect(bt.root.right.val).to.equal(2)
		})
		it("should construct even number length",function (){
			var bt = new BinaryTree([1,2,3,4,7,9,10,11,14,19,40])
			expect(bt.root.val).to.equal(9)
			expect(bt.root.left.val).to.equal(3)
			expect(bt.root.left.left.val).to.equal(1)
			expect(bt.root.left.left.right.val).to.equal(2)
		})
		it('will construct a valid bst',function (){
			var bt1 = new BinaryTree([1,2,3,4,7,9,10,11,14,19,40])
			var bt2 = new BinaryTree([1,2,3,4,7,9,10,11,14,19,40,55,56,57])
			var bt3 = new BinaryTree([1,2,3,4,7,9,10,11,14,19,40,55,56,57,58])
			expect(bt1.isValidBST()).to.be.true
			expect(bt1.isValidBST()).to.be.true
			expect(bt3.isValidBST()).to.be.true
		})
	})

	describe("BinaryTree#traverse",function (){
		it('should allow me to pass in a callback',function (){
			var a = initNodes()
			var bt = new BinaryTree();
			bt.root = a;
			var count = 0
			bt.traverse(function (node){
				count++
			})
			var sum = 0;
			bt.traverse(function (node){
				sum += node.val
			})
			expect(count).to.equal(7);
			expect(sum).to.equal(360)
		})
		it("should traverse in order",function (){
			var a = initNodes()
			var bt = new BinaryTree()
			bt.root = a;
			var values = bt.toArray();
			var expected = [ 5, 10, 15, 50, 70, 90, 120 ]
			for (var i = 0; i < expected.length; i ++ ){
				expect(values[i]).to.equal(expected[i])
			}

		})	

		it('should traverse in vertical order',function () {
			var bt = new BinaryTree()
    	bt.root = initTree()
    	var sol = [[9],[3,15],[20],[7]]
    	var res = bt.traverseVertical()
      expect(res[0][0]).to.equal(sol[0][0])
      expect(res[2][0]).to.equal(sol[2][0])
      expect(res[3][0]).to.equal(sol[3][0])
		})


		it("should traverse with some nulls in the tree",function(){
			var a = initNodes()
			var bt = new BinaryTree()
			a.left = new TreeNode(null)
			bt.root = a;
			var values = bt.toArray()
			var expected = [ null, 50, 70, 90, 120 ]
			for (var i = 0; i < expected.length; i++){
				expect(values[i]).to.equal(expected[i])
			}

		})
	})

	describe('BinaryTree#visualize',function (){
		it('should traverse in vertical order then print ascii',function (){
			var bt = new BinaryTree()
			bt.root = initBigTree()
			bt.traverseVertical()
			bt.visualize()
		})
		it('should traverse in vertical order then print ascii',function (){
			var bt = new BinaryTree()
			bt.root = initHugeTree()
			bt.traverseVertical()
			bt.visualize()
		})
	})

	describe("BinaryTree#isValidBST",function (){
		it('should work with deep sparse trees',function (){
			var bt = new BinaryTree()
			var a = new TreeNode(5)
			a.left = new TreeNode(14)
			a.left.left = new TreeNode(1)
			bt.root = a
			var res = bt.isValidBST()
			expect(res).to.be.false
		})

		it('should fail when tree its balanced to parent but imbalanced to root',function (){
			var bt = new BinaryTree()
			var a = new TreeNode(10)
			var b = new TreeNode(5)
			var c = new TreeNode(15)
			var f = new TreeNode(6)
			var g = new TreeNode(20)
			c.left = f 
			c.right = g
			a.left = b;
			a.right = c;
			bt.root = a;

			var res = bt.isValidBST()
			expect(res).to.be.false
		})
		it('should inherit TreeNode#isValidBST()',function (){
			var a = new TreeNode(3)
			var bt = new BinaryTree()
			bt.root = a
			var res = bt.isValidBST()
			expect(res).to.be.true
		})

		//var expected = [ 5, 10, 15, 50, 70, 90, 120 ]
		//5 = d, 10 = b,15 = e,50 = a,70 = f,90 = c,120 = g
		it('should fail when array is out of order',function (){
			//In Order input[10,5,15,null,null,6,20]
			//               d  b e   a    f   c  g
			var bt = new BinaryTree()
			var a = new TreeNode(null)
			var b = new TreeNode(5)
			var c = new TreeNode(6)
			var d = new TreeNode(10)
			var e = new TreeNode(15)
			var f = new TreeNode(null)
			var g = new TreeNode(20)
			c.left = f 
			c.right = g
			b.left = d 
			b.right = e 
			a.left = b;
			a.right = c;

			bt.root = a
			var res = bt.isValidBST()
			expect(res).to.be.false

		})
	})

	describe("BinaryTree#isSameTree",function (){
		it('should work for base case',function (){
			var bt = new BinaryTree()
			var a = null
			var b = null
			var res = bt.isSameTree(a,b)
			expect(res).to.be.true;
		})
		it('should work for simple case positive',function (){
			var bt = new BinaryTree()
			var a = new TreeNode(8)
			var b = new TreeNode(8)
			var res = bt.isSameTree(a,b)
			expect(res).to.be.true
		})

		it('should work for base case negative',function (){
			var bt = new BinaryTree()
			var a = new TreeNode(1);
			var b = new TreeNode(2);
			var res = bt.isSameTree(a,b);
			expect(res).to.be.false
		})
		it('should be smart when its unbalanced',function (){
			var a = new TreeNode(1);
			var b = new TreeNode(1)
			a.left = new TreeNode(1)
			b.right = new TreeNode(1);
			var bt = new BinaryTree()
			var res = bt.isSameTree(a,b)
			expect(res).to.be.false
		})

	})

	
})


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

function initTree(){
	var tree = new TreeNode(3)
	tree.left = new TreeNode(9)
	tree.right = new TreeNode(20)
	tree.right.left = new TreeNode(15)
	tree.right.right = new TreeNode(7)
	return tree	
}
function initBigTree(){
	var tree = initTree()
	var leaf = tree.right.left
	leaf.right = new TreeNode(16)
	leaf.right.right = new TreeNode(17)
	leaf.right.right.right = new TreeNode(18)
	leaf.right.right.left = new TreeNode(10)
	return tree
}
function initHugeTree(){
	var tree = initBigTree()

	tree.left.left = new TreeNode(5)
	tree.left.left = new TreeNode(2)
	tree.left.left.left = new TreeNode(1)
	tree.left.left.left.left = new TreeNode(0)
	tree.left.left.right = new TreeNode(3)
	tree.left.left.right = new TreeNode(4)

	return tree
}

/*
			3
		 / \
		9   20
			  /\ 
			 15 7
			  \  \
			   10 18
			    \
			     11
*/

/*
		   3
		  / \
		 /	 \ 
		9    20
		     /\
		    /  \
		   15   7
				\
				 \
				 16
					 \	
						\
						17
							\
							 \
							 	18
*/