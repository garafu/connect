var request = function () {
  $.ajax({
    type: "POST",
    url: "/ping",
    dataType: "json",
    data: {
      host: $("#host").val()
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
  $("#result").empty();
  window.setTimeout(request, 100);
};

var document_onready = function () {
  $("#btnSend").on("click", btnSend_onclick);
};

$(document).ready(document_onready);
