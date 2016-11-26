var c = 0;
// Extracts the email content from the webpage, else returns ""
function extractEmail(document_root) {
  var el = document_root.getElementById("x_divtagdefaultwrapper");
  var all_ps = el.getElementsByTagName('p');

  var str = "";

  for(var i = 0; i < all_ps.length; i++) {
    str += all_ps[i].innerText;
  }

  getIntent(str);
  return str;
}

function getIntent(data) {
  var url = "";
  var query = "";
  var blocks = data.split(' ');

  for(var i = 0; i < blocks.length; i++) {
    query += blocks[i] + '%20';
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.api.ai/api/query?v=20150910&query=" + query + "&lang=en&sessionId=ce9e7cec-c947-4d22-b998-0a4c5ad1ed01&timezone=2016-11-25T22:47:26-0500", true);
  xhr.setRequestHeader("Authorization", 'Bearer c4ff8ad5a7254be8a65a4c5104174295');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // innerText does not let the attacker inject HTML elements.
      parseData(xhr.responseText);
    }
  }
  xhr.send();
}

function parseData(jsonData) {
  if(c++ == 0) {
    var obj = JSON.parse(jsonData).result;
    var content = obj.parameters.any;
    var date = obj.parameters.date;
    var service = obj.parameters.service;

    var str = content + "\n" + date + "\n" + service;

    chrome.runtime.sendMessage({
        action: "getSource",
        source: str
    });

    var el = document.getElementById("x_divtagdefaultwrapper");
    var all_ps = el.getElementsByTagName('p');

    str = el.innerHTML;
    var newData = str.replace(content, '<span class="highlight">' + content + '</span>');
    el.innerHTML = newData;
  }
}

// Displays edited content
function displayContent(document_root) {
    var data = extractEmail(document_root);
    return data;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: displayContent(document)
});
