import {randomizeImages} from "../js/toolbox";

// n: number of image pairs in this image store
class ImageStore {
  constructor(n) {
    this.images = [];
    this.n = n;
  }
  
  initializeImages() {
    for (var i = 1; i <=this.n; i ++) {
      var imageObject = {
        src: 'img/' + i + '.png',
        found: false
      };
      this.images.push(imageObject);
      this.images.push(imageObject);
    }
    randomizeImages(this.images);
    return this.images;
  }

  getImage(index) {
    return this.images[index];
  }

  setImageFound(index) {
    this.images[index].found = true;
  }

  getAllImages() {
    return this.images;
  }
}

export {ImageStore};
