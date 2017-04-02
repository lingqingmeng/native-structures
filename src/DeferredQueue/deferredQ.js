module.exports = (function (){
  function DeferredQ(executor) {
    this.state = 'pending';
    this.value = undefined;
    // A list of "clients" that need to be notified when a state
    //   change event occurs. These event-consumers are the promises
    //   that are returned by the calls to the `then` method.
    this.consumers = [];
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  //provide only two ways to transition
  DeferredQ.prototype.fulfill = function (value) {
    if (this.state !== 'pending') return; // 2.1.2.1, 2.1.3.1: cannot transition anymore
    this.state = 'fulfilled'; // 2.1.1.1: can transition
    this.value = value; // 2.1.2.2: must have a value
    this.broadcast();
  }    

  DeferredQ.prototype.reject = function (reason) {
    if (this.state !== 'pending') return; //cannot transition anymore
    this.state = 'rejected'; // can transition
    this.value = reason; // must have a reason
    this.broadcast();
  }    

  // A promise’s then method accepts two arguments:
  DeferredQ.prototype.then = function(onFulfilled, onRejected) {
    var consumer = new DeferredQ(function () {});
    consumer.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;//ignore onFulfilled if not a function
    consumer.onRejected = typeof onRejected === 'function' ? onRejected : null;//ignore onRejected if not a function
    this.consumers.push(consumer);//.then() may be called multiple times on the same promise
    this.broadcast();// It might be that the promise was already resolved... 
    return consumer;// .then() must return a promise
  };

  DeferredQ.prototype.broadcast = function() {
    var promise = this;
    // 2.2.2.1, 2.2.2.2, 2.2.3.1, 2.2.3.2 called after promise is resolved
    if (this.state === 'pending') return;
    // 2.2.6.1, 2.2.6.2 all respective callbacks must execute
    var callbackName = this.state == 'fulfilled' ? 'onFulfilled' : 'onRejected';
    var resolver = this.state == 'fulfilled' ? 'resolve' : 'reject';
    // 2.2.4 onFulfilled/onRejected must be called asynchronously
    setTimeout(function() {//traverse in order
      promise.consumers.splice(0).forEach(function(consumer) {
        try {//ignore callback if not a function, else
          var callback = consumer[callbackName];//call callback as plain function without context
          if (callback) {
            consumer.resolve(callback(promise.value)); //execute the Promise Resolution Procedure:
          } else {
            consumer[resolver](promise.value);//resolve in same way as current promise
          }
        } catch (e) {
          consumer.reject(e);
        };
      })
    });
  };

  // The Promise Resolution Procedure: will treat values that are thenables/promises
  // and will eventually call either fulfill or reject/throw.
  DeferredQ.prototype.resolve = function(x) {
    var wasCalled, then;
    if (this === x) {
      throw new TypeError('Circular reference: promise value is promise itself');
    }
    if (x instanceof DeferredQ) {
      x.then(this.resolve.bind(this), this.reject.bind(this));
    } else if (x === Object(x)) { 
      try {
        then = x.then;
        if (typeof then === 'function') {
          then.call(x, function resolve(y) {
            if (wasCalled) return;
            wasCalled = true;
            this.resolve(y);//recurse
          }.bind(this), function reject(reasonY) {
            if (wasCalled) return;
            wasCalled = true;
            this.reject(reasonY);
          }.bind(this));
        } else {
          this.fulfill(x);
        }
      } catch(e) {
        if (wasCalled) return;
        this.reject(e);
      }
    } else {
      this.fulfill(x);
    }
  }

 


  return DeferredQ
})()
