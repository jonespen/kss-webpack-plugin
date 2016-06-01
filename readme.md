KSS Webpack plugin
===================

[![NPM](https://nodei.co/npm/kss-webpack-plugin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/kss-webpack-plugin/)

## Installation
Install the plugin with npm:
```shell
$ npm install kss kss-webpack-plugin --save-dev
```
## Basic Usage

The plugin will generate a [KSS](https://github.com/kneath/kss) styleguide using [kss-node](https://github.com/kss-node/kss-node).

```javascript
var KssWebpackPlugin = require('kss-webpack-plugin');
var KssConfig = {
  source: 'path/to/css_or_scss'
};
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new KssWebpackPlugin(KssConfig)]
};
```

For more options, see [kss-node cli options](https://github.com/kss-node/kss-node#using-the-command-line-tool)

## Custom template
You can generate a copy of the demo style guide like so:
```shell
$ kss demo
```

Then pass the path to the template in the `KssConfig` object like this

```javascript
var KssWebpackPlugin = require('kss-webpack-plugin');
var KssConfig = {
  source: 'path/to/css_or_scss',
  template: 'path/to/template'
};
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new KssWebpackPlugin(KssConfig)]
};
```
