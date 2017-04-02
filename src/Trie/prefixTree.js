module.exports = (function (){
  function PrefixTree(){
    this.words = 0;
    this.prefixes = 0;
    this.children = [];
  }
  
  PrefixTree.prototype.sayHello = function (){
    return 'My Life for Auir!'
  }

  
    
  /*
  * Insert a word into the dictionary. 
  * Recursively traverse through the trie nodes, and create new node if does not already exist.
  *
  * @method insert
  * @param {String} str Word to insert in the dictionary
  * @param {Integer} pos Current index of the string to be inserted
  * @return {Void}
  */
  PrefixTree.prototype.insert= function(str, pos) {
      if(str.length == 0) { //blank string cannot be inserted
          return;
      }
      
      var T = this,k,child;
          
      if(pos === undefined) {
          pos = 0;
      }
      if(pos === str.length) {
          T.words ++;
          return;
      }
      T.prefixes ++;
      k = str[pos];
      if(T.children[k] === undefined) { //if node for this char doesn't exist, create one
          T.children[k] = new PrefixTree();
      }
      child = T.children[k];
      child.insert(str, pos + 1);
  },
  
  /*
  * Remove a word from the dictionary.
  *
  * @method remove
  * @param {String} str Word to be removed
  * @param {Integer} pos Current index of the string to be removed
  * @return {Void}
  */
  PrefixTree.prototype.remove = function(str, pos) {
      if(str.length == 0) {
          return;
      }
      
      var T = this,
          k,
          child;
      
      if(pos === undefined) {
          pos = 0;
      }   
      if(T === undefined) {
          return;
      }
      if(pos === str.length) {
          T.words --;
          return;
      }
      T.prefixes --;
      k = str[pos];
      child = T.children[k];
      child.remove(str, pos + 1);
  },
  
  /*
  * Update an existing word in the dictionary. 
  * This method removes the old word from the dictionary and inserts the new word.
  *
  * @method update
  * @param {String} strOld The old word to be replaced
  * @param {String} strNew The new word to be inserted
  * @return {Void}
  */
  PrefixTree.prototype.update = function(strOld, strNew) {
      if(strOld.length == 0 || strNew.length == 0) {
          return;
      }
      this.remove(strOld);
      this.insert(strNew);
  },
  
  /*
  * Count the number of times a given word has been inserted into the dictionary
  *
  * @method countWord
  * @param {String} str Word to get count of
  * @param {Integer} pos Current index of the given word
  * @return {Integer} The number of times a given word exists in the dictionary
  */
  PrefixTree.prototype.countWord = function(str, pos) {
      if(str.length == 0) {
          return 0;
      }
      
      var T = this,
          k,
          child,
          ret = 0;
      
      if(pos === undefined) {
          pos = 0;
      }   
      if(pos === str.length) {
          return T.words;
      }
      k = str[pos];
      child = T.children[k];
      if(child !== undefined) { //node exists
          ret = child.countWord(str, pos + 1);
      }
      return ret;
  },
  
  /*
  * Count the number of times a given prefix exists in the dictionary
  *
  * @method countPrefix
  * @param {String} str Prefix to get count of
  * @param {Integer} pos Current index of the given prefix
  * @return {Integer} The number of times a given prefix exists in the dictionary
  */
  PrefixTree.prototype.countPrefix = function(str, pos) {
      if(str.length == 0) {
          return 0;
      }
      
      var T = this,
          k,
          child,
          ret = 0;

      if(pos === undefined) {
          pos = 0;
      }
      if(pos === str.length) {
          return T.prefixes;
      }
      var k = str[pos];
      child = T.children[k];
      if(child !== undefined) { //node exists
          ret = child.countPrefix(str, pos + 1); 
      }
      return ret; 
  },
  
  /*
  * Find a word in the dictionary
  *
  * @method find
  * @param {String} str The word to find in the dictionary
  * @return {Boolean} True if the word exists in the dictionary, else false
  */
  PrefixTree.prototype.find = function(str) {
      if(str.length == 0) {
          return false;
      }
      
      if(this.countWord(str) > 0) {
          return true;
      } else {
          return false;
      }
  },
  
  /*
  * Get all words in the dictionary
  *
  * @method getAllWords
  * @param {String} str Prefix of current word
  * @return {Array} Array of words in the dictionary
  */
  PrefixTree.prototype.getAllWords = function(str) {
      var T = this,
          k,
          child,
          ret = [];
      if(str === undefined) {
          str = "";
      }
      if(T === undefined) {
          return [];
      }
      if(T.words > 0) {
          ret.push(str);
      }
      for(k in T.children) {
          child = T.children[k];
          ret = ret.concat(child.getAllWords(str + k));
      }
      return ret;
  },
  
  /*
  * Autocomplete a given prefix
  *
  * @method autoComplete
  * @param {String} str Prefix to be completed based on dictionary entries
  * @param {Integer} pos Current index of the prefix
  * @return {Array} Array of possible suggestions
  */
  PrefixTree.prototype.autoComplete = function(str, pos) {
      if(str.length == 0) {
          return [];
      }
      
      var T = this,
          k,
          child;
      
      if(pos === undefined) {
          pos = 0;
      }   
      k = str[pos];
      child = T.children[k];
      if(child === undefined) { //node doesn't exist
          return [];
      }
      if(pos === str.length - 1) {
          return child.getAllWords(str);
      }
      return child.autoComplete(str, pos + 1);
  }
  
  return PrefixTree
})()
