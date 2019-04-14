var objToQueryParams = (obj) => {
  return Object.keys(obj).reduce(
    (query, key) => {
      var pre = '';
      if (query !== '') {
        pre = query + '&';
      }
      return pre + key + '=' + obj[key];
    },
    '',
  );
};

var utils = {
  buildParams(url, params = {}) {
    var link = url.replace(/(\/|\?)$/, '');
    var paramQuery = objToQueryParams(params);
    var join = link.includes('?') ? '&' : '?';
    return link + join + paramQuery;
  }
}

module.exports = utils;
