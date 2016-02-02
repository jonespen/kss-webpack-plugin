var kss = require('kss');

function KssPlugin(options) {
  if (!options) {
    throw 'kss webpack plugin: options is not defined. should be an object with at least "source"';
  }
  if (!options.source) {
    throw 'kss webpack plugin: source is not defined';
  }
  this.options = options;
}

KssPlugin.prototype.apply = function (compiler) {
  var self = this;
  compiler.plugin('done', function() {
    kss(self.options, function (error) {
      if (error) throw error;
    });
  });
};

module.exports = KssPlugin;
