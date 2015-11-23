import {Game} from "../js/game";

var gameInstance;
var cardArrayStore = [];
var list = [];

function renderImages() {
  for (var i = 0; i < gameInstance.imageStore.getAllImages().length; i++) {
    var imgElem = document.getElementById('image' + i);
    imgElem.setAttribute("src", gameInstance.imageStore.getImage(i).src);
    if (gameInstance.imageStore.getImage(i).found) {
      imgElem.style.display = 'block';
    } else {
      imgElem.style.display = 'none';
    }
  }
}

function show(imgIndex) {
  var imgElem = document.getElementById('image' + imgIndex);
  imgElem.style.display = 'block';
}

function imageGuessing(imgIndex) {
  console.log("what are we pushing in ingIndex? ", imgIndex);
  if (list.length >= 2) {
    return;
  }

  list.push(imgIndex);
  show(imgIndex);

  if (list.length == 2) {
    gameInstance.guess(list[0], list[1]).then(
      function () {
        gameInstance.imageStore.setImageFound(list[0]);
        gameInstance.imageStore.setImageFound(list[1]);
        renderImages();
        list = [];
      },
      function () {
        setTimeout(function () {
          renderImages();
          list = [];
        }, 900);
      }
    );
  } 
}


function init() {
  gameInstance = new Game();
  renderImages();
}


var cardie = window.cardie = window.cardie || {};
cardie.init = init;
cardie.imageGuessing = imageGuessing;
cardie.createDisplayContent = createDisplayContent;





