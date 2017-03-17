(function(){
var initReady = (document.readyState == 'interactive') ? false: true;
var xready = function(func) {
  if (document.readyState != "loading" && initReady) func();
  else document.addEventListener('DOMContentLoaded', func, false);
}
document.addEventListener('DOMContentLoaded', function() {initReady = true}, false);
window.xready = xready;
})();