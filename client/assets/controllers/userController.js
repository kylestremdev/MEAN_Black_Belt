app.controller('userController', ['$scope', '$location', '$cookies', '$routeParams', 'userFactory', 'entryFactory', function ($scope, $location, $cookies, $routeParams, userFactory, entryFactory) {
  var user = $cookies.getObject('user');
  if (!user) $location.url('/');
  else $scope.user = user;

  userFactory.show($routeParams.user_id, function (res) {
    if (res.status == 200) {
      $scope.showUser = res.data
      $scope.showUser.bucketList.forEach(function(entry, idx) {
        $scope.showUser.bucketList[idx].createdAt = new Date(entry.createdAt).toLocaleString();
        entry.tags.forEach(function (tag_user) {
          if (tag_user._id == $scope.user._id)
            entry.show = true;
        })
      })
    }
    else console.log(res);
  })



  $scope.updateEntry = function (entry) {
    data = {
      entry_id: entry._id,
      finished_status: entry.finished,
      user_id: $scope.user._id
    }
    entryFactory.update(data, function (res) {
      if (res.status == 200) $scope.user = res.data;
      else console.log(res);
    })
  }

  $scope.logoutUser = function () {
    $cookies.remove('user');
    $location.url('/');
  }
}])
