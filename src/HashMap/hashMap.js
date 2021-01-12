const Tuple = require('./tuple');


class SimpleMap {
  constructor() {
    this.map_object = {};
  }

  // key must be type Tuple
  get(key) {
    let found = this.map_object[key.getHashCode()]
    if (typeof found === 'undefined') { return -1 }
    return found;
  }

  // key must be string of type x0y0
  put(key,val) {
    this.map_object[key.getHashCode()] = val;
  }
}

// consider extending SimpleMap with different parameterizations
function HashMap(){
}

HashMap.prototype.logTestData = function (){
  return 'Test Data'
}


module.exports = {
  SimpleMap, HashMap
}
  
  
