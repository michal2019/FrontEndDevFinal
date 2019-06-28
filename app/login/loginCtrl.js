
app.controller("loginCtrl", function ($scope, $location, $log, userSrv) {

    $scope.invalidLogin = false;
    $scope.email = "michal.rechler@gmail.com";
    $scope.pwd = "12345";

    $scope.login = function () {
        userSrv.login($scope.email, $scope.pwd).then(function (activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/main");
        }, function (err) {
            $scope.invalidLogin = true;
        });
    }
})