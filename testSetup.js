require('babel-polyfill');
require('ignore-styles');
require('./mixins');
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
Object.keys(window).forEach(prop => {
  if (typeof global[prop] === 'undefined') {
    global[prop] = window[prop];
  }
});
global.HTMLElement = window.HTMLElement;
global.navigator = {
  userAgent: 'node.js'
};
