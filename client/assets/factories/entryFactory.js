app.factory('entryFactory', ['$http', function ($http) {
  var factory = {};

  factory.create = function (entryData, callback) {
    $http.post('/entry', entryData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  factory.update = function (data, callback) {
    $http.put(('/entry/' + data.entry_id), data).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}])
