var log = [];
var startTime = (new Date()).getTime();


var doScrollCheck = function() {
  try{document.documentElement.doScroll( 'left' );}
  catch(e){ return false;}
  return true;
}
var logUpdate = function(type) {
  var time = (new Date()).getTime() - startTime;
  var lastElement = document.getElementById('last');
  var lastElementLog = (lastElement === null) ? "NULL" : "O";
  var lasetElementOffsetTop = (lastElement && lastElement.offsetTop ) || "UNKNOWN";
  log.push({
    type: type,
    state: document.readyState,
    scroll : doScrollCheck(),
    lElem: lastElementLog, 
    lOffsetTop: lasetElementOffsetTop, 
    time: time 
  });
  return this;
}

logUpdate('init');
  
AddEvent = function(target, type, func) {
  if (func == undefined) {var func = type, type = target, target = window;};
  if (target.addEventListener) target.addEventListener(type, func, false);
  else if (target.attachEvent) target.attachEvent('on'+type, func);
};

AddEvent(window, 'load', function(){
  logUpdate('load');
});

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', function(){
    logUpdate('DOMContentLoaded');
  });
}

AddEvent(document, 'readystatechange', function(){
  logUpdate('readyState');
});

AddEvent(document, 'readystatechange', function(){
  if (document.readyState == "interactive") {
    document.addEventListener('DOMContentLoaded', function(){
      logUpdate('interactive-DOMContentLoaded');
    });
  }
});


// 
var LogElement = function(name, html) {
  var _ELEMENT = document.createElement(name);
  if (html !== undefined) _ELEMENT.innerHTML = html;
  return _ELEMENT;
}

AddEvent(window, 'load', function(){
  for (var i=0; i < log.length; i++) {
    var item = log[i];
    var tr = LogElement('tr');
    tr.appendChild(LogElement('td', i+1));
    var typeElem = LogElement('td', item.type);
    typeElem.className = "log-type";
    tr.appendChild(typeElem);
    tr.appendChild(LogElement('td', item.state));
    tr.appendChild(LogElement('td', item.lElem));
    tr.appendChild(LogElement('td', item.lOffsetTop));
    tr.appendChild(LogElement('td', item.scroll));
    tr.appendChild(LogElement('td', item.time));
    document.getElementById('log-table').appendChild(tr);
  }
});
