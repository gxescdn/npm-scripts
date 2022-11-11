function devtoolIsOpening() {
    console.clear();
    let before = new Date().getTime();
    debugger;
    let after = new Date().getTime();
    if (after - before > 200) {
        document.write(" Dont open Developer Tools. ");
        window.location.replace("https://www.google.com");
    }
    setTimeout(devtoolIsOpening, 100);
}
devtoolIsOpening();

if (document.layers) {
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = clickNS4;
} else if (document.all && !document.getElementById) {
  document.onmousedown = clickIE4;
}
if (document.layers) {
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = clickNS4;
} else if (document.all && !document.getElementById) {
  document.onmousedown = clickIE4;
} else {
  document.onmousedown = function(e) {
    if (e.button == 2) {
      setTimeout(function() {
        location.href = "http://www.google.com";
      }, 500);
    }
  }
}