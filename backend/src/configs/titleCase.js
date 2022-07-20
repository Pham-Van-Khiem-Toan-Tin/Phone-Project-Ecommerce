module.exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.chartAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
