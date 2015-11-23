// var _ = require('../js/toolbox.js');
import {randomizeImages} from "../js/toolbox.js";

// n: number of image pairs in this image store
var ImageStore = function(n) {
  this.images = [];
  this.n = n;

  this.initializeImages  = function () {
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
  };

  this.getImage = function (index) {
    return this.images[index];
  };

  this.setImageFound = function (index) {
    this.images[index].found = true;
  };

  this.getAllImages = function () {
    return this.images;
  };
};


module.exports = ImageStore;
