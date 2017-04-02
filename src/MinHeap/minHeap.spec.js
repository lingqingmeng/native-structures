var expect = require("chai").expect;
var MinHeap = require('./minHeap');

describe("Min Heap test suite",function (){
	describe("MinHeap#constructor",function(){
		it('initial .size', function() {
		  var heap = new MinHeap();
      expect(heap.size).to.equal(0)
		});

    it('should have 100 as size after 100 inserts', function() {
      var heap = new MinHeap();
      for (var i = 0; i < 100; ++i) {
        heap.insert(Math.random());
      }
      expect(heap.size).to.equal(100);
    });

    it('should remove biggest item', function() {
      var heap = new MinHeap();
      heap.insert(12);
      heap.insert(22);
      heap.insert(32);
      heap.insert(5);
      heap.insert(42);
      expect(heap.remove(5)).to.be.true
      expect(heap.size).to.equal(4)
      
    });

    it('remove non-existant item', function() {
      var heap = new MinHeap();
      heap.insert(1);
      heap.insert(2);
      heap.insert(3);
      expect(heap.remove(4)).to.be.false
      expect(heap.size).to.equal(3)
    });

    it('should heap right',function (){
      var rightHeap = new MinHeap()
      var nums = [8,9,10,11] //choose 2
      //will want to return 10,9 except it should be 9,10
      //choose 3, will want to return 11,10,9
      //instead should be 9,10,11
    })



    it('removeHead should be nicely sorted', function() {
      var heap = new MinHeap();
      var nums = [13,2,13,41,5,8,11];
      for (var i = 0; i < nums.length; i++){
        heap.insert(nums[i]);
      }
      var lowest = heap.removeHead()
      var lower = heap.removeHead()
      expect(lowest).to.equal(2)
      expect(lower).to.equal(5)
    });

    it('should be a maxheap now',function (){
      var heap = new MinHeap(function (l,r){
        return r-l
      })
      heap.insert(12);
      heap.insert(22);
      heap.insert(32);
      heap.insert(5);
      heap.insert(42)
      expect(heap.removeHead()).to.equal(42)
    })

	})
  describe("MinHeap#peek",function (){
    it("should peak without popping",function (){
      var heap = new MinHeap();
      var nums = [13,2,13,41,5,8,11];
      for (var i = 0; i < nums.length; i++){
        heap.insert(nums[i]);
      }
      expect(heap.peek()).to.equal(2)
      expect(heap.removeHead()).to.equal(2)
      expect(heap.peek()).to.equal(5)
    })
  })
  describe("MinHeap#acquire",function (){
    it("should get top 3 smallest",function (){
      var heap = new MinHeap()
      var nums =[19,10,7,4,6,3,5,15]
      var res = heap.acquire(nums,3)
      expect(res[0]).to.equal(3)
      expect(res[1]).to.equal(4)
      expect(res[2]).to.equal(5)
    })
    it("should get top 3 largest",function (){
      var heap = new MinHeap(function(l,r){
        return r-l
      })
      var nums =[19,10,7,4,6,3,5,15]
      var res = heap.acquire(nums,3)
      expect(res[0]).to.equal(19)
      expect(res[1]).to.equal(15)
      expect(res[2]).to.equal(10)
    })
  })
})