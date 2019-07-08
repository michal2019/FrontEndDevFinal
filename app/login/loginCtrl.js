
app.controller("loginCtrl", function ($scope, $location, $log, userSrv) {

    $scope.invalidLogin = false;
    $scope.email = "";
    $scope.pwd = "";
   

    $scope.login = function () {
        if ($scope.email && $scope.pwd) {
            userSrv.login($scope.email, $scope.pwd).then(function (activeUser) {
                $log.info("Successful login with: " + JSON.stringify(activeUser));
                $location.path("/main");
            }, function (err) {
                $scope.invalidLogin = true;
            });
        }
        else {
            $scope.invalidLogin = true;
        }
    }
})