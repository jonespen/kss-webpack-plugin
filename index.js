var kss = require('kss');
var path = require('path');

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
  if (!self.options.chunks) {
    compiler.plugin('done', function() {
      kss(self.options, function (error) {
        if (error) throw error;
      });
    });
  } else {
    compiler.plugin('emit', (compilation, callback) => {
      this.render(compilation, callback);
    });
  }
};

KssPlugin.prototype.render = function (compilation, callback) {
  var self = this;
  new Promise(function(resolve, reject) {
    var assets = this._buildAssets(compilation);
  
    kss(Object.assign({}, self.options, assets), function (error) {
      if (error) throw error;
    });
    resolve();
  }).then(() => {
      callback();
    }
  )
};

KssPlugin.prototype._buildAssets = function (compilation) {
  const assets = {
    css: [],
    js: []
  };

  this.options.chunks.forEach(function(key) {
    var pushAsset = function(file) {
      const ext = path.extname(file);

      if (ext === '.css') {
          assets.css.push(path.join('/', file))
      } else if (ext === '.js') {
          assets.js.push(path.join('/', file));
      }
    }   

    const asset = compilation.getStats().toJson().assetsByChunkName[key];

    if(typeof asset === 'string') {
      pushAsset(asset)
    } else {
      asset.forEach((file) => {
        pushAsset(file)
      })
    }
  });

  return assets;
};

module.exports = KssPlugin;
