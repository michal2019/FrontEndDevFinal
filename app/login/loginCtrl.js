
app.controller("loginCtrl", function ($scope, $location, $log, userSrv) {

    // $scope.invalidLogin = false;

    $scope.login = function () {
        userSrv.login($scope.email, $scope.pwd).then(function (activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/jobReplies");
        }, function (err) {
            $scope.invalidLogin = true;
        });
    }
})