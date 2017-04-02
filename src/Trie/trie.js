module.exports = (function (){
  function Trie(){
  	this.root = {}

  }
  
  /**
   * Inserts a word into the trie. 
   * @param {string} word
   * @return {void}
   */
  Trie.prototype.insert = function(word) {
    var curr = this.root
    for (let i =0 ; i < word.length; i++){
      var c = word.charAt(i)
      if (!curr[c]) {
        curr[c] = {}
      }
      curr = curr[c]
      if (i === word.length -1){
        curr['$'] = 1
      }
    }
  };

  /**
   * Returns if the word is in the trie. 
   * @param {string} word
   * @return {boolean}
   */
  Trie.prototype.search = function(word) {
    var curr = this.root;
    for (let i =0; i < word.length; i++){
      var c = word.charAt(i)
      if (curr[c]) {
        curr = curr[c]
      }else {
        return false
      }
      if ((i === word.length -1) && (curr['$'] == 1)){
        return true
      }
    }
    return false
  };

  /**
   * Returns if there is any word in the trie that starts with the given prefix. 
   * @param {string} prefix
   * @return {boolean}
   */
  Trie.prototype.startsWith = function(prefix) {
    var curr = this.root;
    var matches = 0
    for (let i =0; i < prefix.length; i++){
      var c = prefix.charAt(i)
      if (curr[c]) {
        curr = curr[c]
        matches++
      }      
    }
    return matches === prefix.length
  };

  /** 
   * Your Trie object will be instantiated and called as such:
   * var obj = Object.create(Trie).createNew()
   * obj.insert(word)
   * var param_2 = obj.search(word)
   * var param_3 = obj.startsWith(prefix)
   */
  return Trie
})()
