var request = function () {
  $.ajax({
    type: "POST",
    url: "/mysql",
    dataType: "json",
    data: {
      host: $("#host").val(),
      port: $("#port").val(),
      database: $("#database").val(),
      user: $("#user").val(),
      password: $("#password").val(),
      ssl: $("#ssl").val()
    },
    success: (data, textStatus, jqXHR) => {
      $("#result").html(JSON.stringify(data));
    },
    error: (jqXHR, textStatus, errorThrown) => {
      $("#result").append(document.createTextNode(jqXHR.responseText));
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
