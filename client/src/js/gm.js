var closeApp = function () {
  console.log("close app");
  gm.appmanager.closeApp();
};

module.exports = {
  closeApp: closeApp
};