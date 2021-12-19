var request = function () {
  $.ajax({
    type: "POST",
    url: "/mssql",
    dataType: "json",
    data: {
      host: $("#host").val(),
      port: $("#port").val(),
      database: $("#database").val(),
      username: $("#username").val(),
      password: $("#password").val(),
      ssl: $("#ssl").val()
    },
    success: (data, textStatus, jqXHR) => {
      $("#result").html(JSON.stringify(data));
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
