app.controller('dashboardController', ['$scope', '$location', '$cookies', 'userFactory', 'entryFactory', function ($scope, $location, $cookies, userFactory, entryFactory) {
  var user = $cookies.getObject('user');
  if (!user) $location.url('/');
  else $scope.user = user;

  userFactory.show($scope.user._id, function (res) {
    if (res.status == 200) {
      $scope.user = res.data;
      $scope.user.bucketList.forEach(function (entry, idx) {
        $scope.user.bucketList[idx].createdAt = new Date(entry.createdAt).toLocaleString();
      })
    } else console.log(res);
  })

  $scope.users = [];
  userFactory.index(function (res) {
    if (res.status == 200) $scope.users = res.data;
    else console.log(res);
  })

  $scope.createEntry = function (entry) {
    entry.tags.splice(0,0,$scope.user._id);
    entry.user_id = $scope.user._id;
    entryFactory.create(entry, function (res) {
      if (res.status == 200) $scope.user = res.data;
      else {
        console.log(res);
        $scope.errors = [];
        for (var key in res.data.errors) {
          $scope.errors.push(res.data.errors[key].message)
        }
      }
      $scope.newEntry = {tags:[]};
    })
  }

  $scope.updateEntry = function (entry) {
    data = {
      entry_id: entry._id,
      finished_status: entry.finished,
      user_id: $scope.user._id
    }
    entryFactory.update(data, function (res) {
      if (res.status == 200) $scope.user = res.data;
    })
  }

  $scope.logoutUser = function () {
    $cookies.remove('user');
    $location.url('/');
  }

  $scope.min = function (x, y) {
    return (x ? x < y : y);
  }
}])
