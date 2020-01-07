const kss = require('kss');
const path = require('path');

function KssPlugin(options) {
  if (!options) {
    throw 'kss webpack plugin: options is not defined. should be an object with at least "source"';
  }
  if (!options.source) {
    throw 'kss webpack plugin: source is not defined';
  }
  this.options = options;
}

KssPlugin.prototype.apply = function apply(compiler) {
  const kssCompile = () => {
    kss(this.options, (error) => {
      if (error) throw error;
    });
  }

  const kssRender = (compilation, callback) => {
    this.render(compilation, callback);
  }

  if (!this.options.chunks) {
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

KssPlugin.prototype.render = function render(compilation, cb) {
  const callback = typeof cb === 'function' ? cb : () => {};
  new Promise((resolve) => {
    const assets = this._buildAssets(compilation);

    kss(Object.assign({}, this.options, assets), (error) => {
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

  this.options.chunks.forEach((key) => {
    const pushAsset = (file) => {
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
