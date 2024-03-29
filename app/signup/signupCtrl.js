app.controller("signupCtrl", function ($scope, $log, userSrv, $location) {
    $scope.invalidLogin = false;
    $scope.email = "";
    $scope.pwd = "";
    $scope.username = "";


    $scope.signUp = function () {
        if ($scope.username && $scope.email && $scope.pwd) {
            userSrv.signUp($scope.username, $scope.email, $scope.pwd).then(function (activeuser) {
                console.log('User signed up', activeuser);
                $location.path("/main");
            }, function (err) {
                $scope.invalidLogin = true;
            });
        }
        else {
            $scope.invalidLogin = true;
        }
    };
});
