var q = require('q');
var ImageStore = require('../js/imageStore.js');


var Game = function () {
  this.imageStore = new ImageStore(4);
  this.imageStore.initializeImages();
  this.count = 0;
  this.success = false;

  this.guess = function (card1Index, card2Index) {
    var defer = q.defer();
    if (card2Index === card1Index) {
      defer.reject();
    } else {
      
      var card1 = this.imageStore.getImage(card1Index);
      var card2 = this.imageStore.getImage(card2Index);

      if (card1.src === card2.src) {
        card1.found = true;
        card2.found = true;
        this.count = this.count + 2;
        this.guessingRightAllCards();
        defer.resolve();
      } else {
        defer.reject();
      } 
    }


    return defer.promise;
  };

  this.guessingRightAllCards = function () {
    if (this.count === this.imageStore.getAllImages().length) {
      this.success = true;
    } 
  };
};


module.exports = Game;

