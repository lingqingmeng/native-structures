Object.defineProperty(String.prototype, 'hashCode', {
  value: function() {
    var hash = 0, i, chr;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
});

class Tuple {

	// x y must be int
	constructor(x,y) {
		this.x = x;
		this.y = y;
    this.parent = null;
	}

	getHashCode() {
		let str = this.x.toString() + ',' + this.y.toString()
		this.hashCode = str; // this may come in handy later
		return str.hashCode();
	}

	asArray() {
		return [this.x,this.y]
	}

	// cell is type Tuple - needs to be tolerant from hash collisions
	isEqualTo(cell) {
		return (this.x === cell.x) && (this.y === cell.y);
	}

	hasCoordinates(arr) {
		return (this.x === arr[0]) && (this.y === arr[1])
	}

	// cell must be type tuple
	setParent(cell) {
		this.parent = cell;
	}

	[Symbol.iterator]() {
  	let current = this;
  	const iterable = {
  		next: () => {
        const { hashCode, parent } = current;
  			if (current.parent === null) {
  				return {
  					value: hashCode,
  					done: true
  				}
  			}
        current = parent;
        return { 
          value: hashCode,
          done: false,
        }

  		}
  	};
  	return iterable;
	 }

}




module.exports = {
  tuple: Tuple
}
