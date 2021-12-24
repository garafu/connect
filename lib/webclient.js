const http = require("http");
const https = require("https");
const { URL, URLSearchParams } = require("url");
var WebClient = function () { };

var getClient = function (protocol) {
  switch (protocol) {
    case "http:":
      return http;
    case "https:":
      return https;
    default:
      throw new Error("protocol error.");
  }
};

/**
 * 
 * @param {String} options.method 
 * @param {String} options.url 
 * @param {Object} options.headers 
 * @param {String} options.body 
 * @returns {Promise}
 */
WebClient.request = async function (options) {
  return new Promise((resolve, reject) => {
    var url, client, req;

    // Create URL.
    url = new URL(options.url);

    // Create web request client.
    client = getClient(url.protocol);

    // Prepare request object.
    req = client.request(
      url,
      {
        method: options.method || "GET",
        headers: options.headers
      }, (res) => {
        var data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          res.data = data;
          resolve(res);
        });
      });
    req.on("error", (error) => {
      reject(error);
    });
    req.end(options.body || undefined);
  });
};

module.exports = WebClient;