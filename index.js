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

  var kssCompile = function(compilation) {
    kss(self.options, function(error) {
      if (error) throw error;
    });
  }

  var kssRender = function(compilation, callback) {
    this.render(compilation, callback);
  }

  if (!self.options.chunks) {
    if (compiler.hooks) {
      compiler.hooks.done.tap('KssPlugin', kssCompile);
    }
    else {
      compiler.plugin('done', kssCompile);
    }
  }
  else {
    if (compiler.hooks) {
      compiler.hooks.emit.tap('KssPlugin', kssRender);
    }
    else {
      compiler.plugin('emit', kssRender);
    }
  }
};

KssPlugin.prototype.render = function (compilation, callback) {
  var self = this;
  new Promise(function(resolve, reject) {
    var assets = self._buildAssets(compilation);
  
    kss(Object.assign({}, self.options, assets), function (error) {
      if (error) throw error;
    });
    resolve();
  })
    .then(() => {
      callback();
    })
    .catch(() => {
      callback();
    })
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
