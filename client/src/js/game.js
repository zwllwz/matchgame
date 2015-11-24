import {ImageStore} from "../js/imageStore";

class Game {
  constructor() {
    this.imageStore = new ImageStore(4);
    this.imageStore.initializeImages();
    this.count = 0;
    this.success = false;
  }
  
  guess(card1Index, card2Index) {
    var p  = new Promise((resolve, reject) => {
      if (card2Index === card1Index) {
          reject();
        } else {
          let card1 = this.imageStore.getImage(card1Index);
          let card2 = this.imageStore.getImage(card2Index);

          if (card1.src === card2.src) {
            card1.found = true;
            card2.found = true;
            this.count = this.count + 2;
            this.guessingRightAllCards();
            resolve();
          } else {
            reject();
          } 
        }
    });

    return p;
  }

  guessingRightAllCards() {
    if (this.count === this.imageStore.getAllImages().length) {
      this.success = true;
    } 
  }
}

export {Game};

