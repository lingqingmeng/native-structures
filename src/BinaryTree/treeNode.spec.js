var expect = require("chai").expect;
var isSameTree = require('./algorithms/index').isSameTree
var TreeNode = require('./treeNode')
describe("TreeNode Class Unit Tests",function (){
	describe("TreeNode Constructor",function (){
		it('should construct tree nodes and whatnot',function (){
			var treeNode = new TreeNode(3)
			console.log("treeNode: ",treeNode)
			expect(treeNode.left).to.be.a('null')
			expect(treeNode.right).to.be.a('null')
			expect(treeNode.val).to.equal(3)
		})
	})

	describe('TreeNodes like monkeys in a barrel',function (){
		it('should connect 2 tree nodes',function (){
			var a = new TreeNode(5)
			var b = new TreeNode(1)
			var c = new TreeNode(9)
			a.left = b;
			a.right = c;
			expect(a.left.val).to.equal(1)
			expect(a.right.val).to.equal(9)
		})
		it('should make an even bigger tree',function (){
			var a = initNodes();
			expect(a.left.left.val).to.equal(5)
			expect(a.right.right.val).to.equal(120);
		})
	})

	describe("TreeNode#isValidBST",function (){
		it('should pass true for a single treenode',function (){
			var a = new TreeNode(5)
			var res = a.isValidBST()
			expect(res).to.be.true
		})

		it('should return false for left imbalance',function(){
			var a = new TreeNode(3)
			a.left = new TreeNode(4)
			var res = a.isValidBST()
			expect(res).to.be.false
		})

		it('should return false for right imbalance',function(){
			var a = new TreeNode(3)
			a.right = new TreeNode(3)
			var res = a.isValidBST()
			expect(res).to.be.false
		})

		it('should work for a complicated tree',function (){
			var a = initNodes()
			var res = a.isValidBST()
			expect(res).to.be.true
		})

		it('should return true for a complicated nonfull tree',function (){
			var a = initNodes()
			a.left = null
			var res = a.isValidBST()
			expect(res).to.be.true
		})
	})

	describe("isSameTree function",function (){
		it('should work for base case',function (){
			var a = null
			var b = null
			var res = isSameTree(a,b)
			expect(res).to.be.true;
		})
		it('should work for simple case positive',function (){
			var a = new TreeNode(8)
			var b = new TreeNode(8)
			var res = isSameTree(a,b)
			expect(res).to.be.true
		})

		it('should work for base case negative',function (){
			var a = new TreeNode(1);
			var b = new TreeNode(2);
			var res = isSameTree(a,b);
			expect(res).to.be.false
		})


		it('should not work for this simple case',function (){
			var a = null
			var b = new TreeNode(0)
			var res = isSameTree(a,b)
			expect(res).to.be.false
		})

		it('should work in a more complicated case',function (){
			var a = initNodes()
			var b = initNodes()
			var res = isSameTree(a,b)
			expect(res).to.be.true
		})

		it("should find these two aren't the same tree",function (){
			var a = initNodes()
			var b = initNodes()
			var x = new TreeNode(300)
			a.right.right.right = x
			var res = isSameTree(a,b)
			
			expect(res).to.be.false

		})
		it('should be smart when its unbalanced',function (){
			var a = new TreeNode(1);
			var b = new TreeNode(1)
			a.left = new TreeNode(1)
			b.right = new TreeNode(1);
			var res = isSameTree(a,b)
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