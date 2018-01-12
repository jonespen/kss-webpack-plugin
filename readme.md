KSS Webpack plugin
===================

[![NPM](https://nodei.co/npm/kss-webpack-plugin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/kss-webpack-plugin/)

## Installation
Install the plugin with npm:
```shell
$ npm install kss kss-webpack-plugin --save-dev
```
## Basic Usage

The plugin will generate a [KSS](https://github.com/kneath/kss) styleguide using [kss-node](https://github.com/kss-node/kss-node). None of the chunks created by Webpack will be added to the styleguide by default - the developer is required to include those manually.

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

## Usage with Chunks

Using the `chunks` config option, an array of named chunks can be supplied to KssWebpackPlugin, for automatic insersion into the compiled styleguide. Currently only JS or CSS chunks are supported.

```javascript
var KssWebpackPlugin = require('kss-webpack-plugin');
var KssConfig = {
  source: 'path/to/css_or_scss',
  chunks: ['manifest', 'vendor', 'common', 'styles']
};
var webpackConfig = {
  entry: {
    styles: './assets/scss/index.scss',
    common: './assets/js/index.js',
  },
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
  builder: 'path/to/template'
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
