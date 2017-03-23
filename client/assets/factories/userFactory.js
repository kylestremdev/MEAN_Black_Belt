app.factory('userFactory', ['$http', function ($http) {
  var factory = {};

  factory.login = function (userData, callback) {
    $http.post('/users', userData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  factory.index = function (callback) {
    $http.get('/users').then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  factory.show = function (user_id, callback) {
    $http.get('/users/' + user_id).then(function (res) {
      callback(res)
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}])
