(function() {
  var imAnObject, someFunction;

  imAnObject = {
    foo: 'bar',
    baz: someFunction()
  };

  someFunction = function() {
    return 'qux';
  };

}).call(this);
