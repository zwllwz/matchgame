var randomizeImages = function (images) {
  Array.prototype.randomize = function()
    {
      var i = this.length;
      var j;
      var temp;
      while (--i)
      {
        j = Math.floor( Math.random() * (i - 1) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }
  };
  images.randomize();
};


module.exports = {
  randomizeImages: randomizeImages
};

