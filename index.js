'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var path = require('path');

var getTemplate = function () {
  return fs.readFileAsync(path.join(__dirname, 'template', 'less.hbs'), 'utf8');
};

var transform = Promise.method(function (layouts, source, opt, Handlebars) {
  var template = Handlebars.compile(source);
  return template({
    layouts: layouts,
    opt: opt
  });
});

module.exports = {
  process: function (layouts, opt, Handlebars) {
    return getTemplate()
      .then(function (source) {
        return transform(layouts, source, opt, Handlebars);
      });
  },
  isBeautifyable: function () {
    return true;
  },
  extension: function () {
    return 'less';
  }
};
