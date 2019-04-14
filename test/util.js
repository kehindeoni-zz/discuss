var expect = require('chai').expect;
var utils = require('../utils');

describe('Utils', function() {
  it('buildUrlParams() returns full url with object params as query params', () => {
    const url = 'http://sample.net';
    const urlWithQuery = 'http://sample.net?e=f';
    const params = {
      a: 'b',
      c: 'd',
    };
    expect(utils.buildParams(url, params)).to.eql('http://sample.net?a=b&c=d');
    expect(utils.buildParams(url + '?', params)).to.eql('http://sample.net?a=b&c=d');
    expect(utils.buildParams(url + '/', params)).to.eql('http://sample.net?a=b&c=d');
    expect(utils.buildParams(urlWithQuery, params)).to.eql('http://sample.net?e=f&a=b&c=d');
  });
});
