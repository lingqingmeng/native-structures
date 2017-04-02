module.exports = (function (){
  function BSTIterator(root){
  	this.stack = [];
    this.root = root
    this.curr = root
    this.stack.push(this.curr);
  }
  
  /**
	 * @this BSTIterator
	 * @returns {boolean} - whether we have a next smallest number
	 */
	BSTIterator.prototype.hasNext = function() {
		return this.stack.length !== 0
	};

	/**
	 * @this BSTIterator
	 * @returns {number} - the next smallest number
	 */
	BSTIterator.prototype.next = function() {
		this.stack.push(this.curr)
		if (this.curr.left) {
			this.curr = this.curr.left

		}else if (this.curr.right){
			this.curr =  this.curr.right
		}
	};
  return BSTIterator
})()
