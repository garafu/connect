var btnSend_onclick = function (event) {
  $("#result").empty();
  $.ajax({
    type: "POST",
    url: "/",
    dataType: "json",
    data: {
      user: $("#user").val(),
      host: $("#host").val(),
      database: $("#database").val(),
      password: $("#password").val(),
      port: $("#port").val(),
      connectionString: $("#connectionString").val()
    },
    success: (data, textStatus, jqXHR) => {
      $("#result").html(JSON.stringify(data));
      // alert(data);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      $("#result").html(jqXHR.responseText);
      // alert(textStatus);
    }
  })
};

var document_onready = function () {
  $("#btnSend").on("click", btnSend_onclick);
};

$(document).ready(document_onready);
