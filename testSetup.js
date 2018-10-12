require('@babel/polyfill');
require('ignore-styles');
const { JSDOM } = require('jsdom');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/'
});
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
