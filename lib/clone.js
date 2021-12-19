var clone = function (obj) {
  var copy = {}, keys = ["name", "message"];
  for (let key of keys) {
    copy[key] = obj[key] ? obj[key] : undefined;
  }
  for (let key in obj) {
    copy[key] = obj[key];
  }
  return copy;
};

module.exports = clone;