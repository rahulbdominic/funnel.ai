// Extracts the email content from the webpage, else returns ""
function extractEmail(document_root) {
  var el = document_root.getElementById("x_divtagdefaultwrapper");
  var data = el.children[0].innerHTML.split('<br>');

  // For testing purposes
  // document_root.getElementById("x_divtagdefaultwrapper").innerHTML = "";

  var str = "";
  if (data) {
    for(var i = 0; i < data.length; i++) {
      str += data[i];
    }
    console.log("Email Content: " + str);
  }

  return str;
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
