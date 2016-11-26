chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var data = request.source;
    data = data.split('\n');
    document.querySelector('#item_title').value = data[0];
    document.querySelector('#date').value = data[1];
    document.querySelector('#title_div').innerHTML = document.querySelector('#title_div').innerHTML + " " + data[2];
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
