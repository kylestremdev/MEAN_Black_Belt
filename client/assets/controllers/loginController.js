app.controller('loginController', ['$scope', '$location', '$cookies', 'userFactory', function ($scope, $location, $cookies, userFactory) {
  var user = $cookies.getObject('user');
  if (user) {
    $location.url('/dashboard');
  }

  $scope.loginUser = function (user) {
    userFactory.login(user, function (res) {
      if (res.status == 200) {
        $cookies.putObject('user', res.data);
        $location.url('/dashboard');
      } else {
        $scope.errors = [];
        for (var key in res.data.errors) {
          $scope.errors.push(res.data.errors[key].message);
        }
      }
    });
  }
}])
