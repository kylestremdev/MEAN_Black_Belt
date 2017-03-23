var app = angular.module('beltApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'loginController'
  })
  .when('/dashboard', {
    templateUrl: 'partials/dashboard.html',
    controller: 'dashboardController'
  })
  .when('/user/:user_id', {
    templateUrl: 'partials/user.html',
    controller: 'userController'
  })
})
