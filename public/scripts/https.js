var getHostName = function () {
  var url = $("#url").val();
  var result = url.replace(/\\/g, '/').match(/\/\/([^/?]*)/);
  return result ? result[1] : "";
};

var getBodyBytes = function () {
  var text = $("#body").val();
  return text ? (new Blob([text])).size : 0;
}

var getDefaultUserAgent = function () {
  return `connect`;
};

var modifyRequestUrl = function () {
  var $url = $("#url");
  var text = $url.val();

  // Add "http://"
  if (!text.match(/^https?:\/\//)) {
    text = "http://" + text;
  }

  $url.val(text);
};

var modifyRequestHeader = function () {
  var headers, rows;
  var text = $("#header").val() || "";

  // Remove waiste newline code.
  text = text.replace(/\r\n/g, "\n");
  text = text.replace(/^(\r\n|\n)/gm, "");
  text = text.replace(/\n$/gm, "");

  // Add "Host"
  var regHost = /host: .*/gi
  if (text.match(regHost)) {
    text = text.replace(regHost, `Host: ${getHostName()}`);
  } else {
    text += `\n`;
    text += `Host: ${getHostName()}`;
  }

  // Add "User-Agent"
  var regUserAgent = /user-agent: .*/gi;
  if (!text.match(regUserAgent)) {
    text += `\n`;
    text += `User-Agent: ${getDefaultUserAgent()}`;
  }

  // Add "Content-Length"
  if ($("#method").val() !== "GET") {
    var regContentLength = /content-length: .*/gi;
    if (text.match(regContentLength)) {
      text = text.replace(regContentLength, `Content-Length: ${getBodyBytes()}`);
    } else {
      text += `\n`;
      text += `Content-Length: ${getBodyBytes()}`;
    }
  }

  // Modify return code.
  text = text.replace(/^\n/gm, "");

  // Reflect modified text.
  $("#header").val(text);
}

var executeRequest = function () {
  $.ajax({
    type: "POST",
    url: "/https",
    dataType: "json",
    data: {
      method: $("#method").val(),
      url: $("#url").val(),
      header: $("#header").val(),
      body: $("#body").val()
    },
    success: (data, textStatus, jqXHR) => {
      $("#result").append(document.createTextNode(jqXHR.responseText ? jqXHR.responseText : textStatus));
    },
    error: (jqXHR, textStatus, errorThrown) => {
      $("#result").append(document.createTextNode(jqXHR.responseText ? jqXHR.responseText : textStatus));
    }
  });
};

var btnSend_onclick = function (event) {
  Promise.resolve((() => {
    $("#result").empty();
  })()).then(() => {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        modifyRequestUrl();
        resolve();
      }, 100);
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        modifyRequestHeader();
        resolve();
      }, 100);
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        executeRequest();
        resolve();
      }, 100);
    });
  })
};

var form_onsubmit = function (event) {
  btnSend_onclick(event);
  return false;
};

var document_onready = function () {
  $("#btnSend").on("click", btnSend_onclick);
  $("#form").on("submit", form_onsubmit);
};

$(document).ready(document_onready);
