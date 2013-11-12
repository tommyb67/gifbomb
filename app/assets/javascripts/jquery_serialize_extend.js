jQuery.fn.serializeParams = function(paramKey) {

  var serializedParams = this.serialize();
  var paramArray = serializedParams.split("&");
  paramArray = paramArray.map( function(element) {
    return paramKey + "[" + element;
  });

  serializedParams = paramArray.join("&");
  return serializedParams;
}