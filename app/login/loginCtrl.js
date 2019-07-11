
app.controller("loginCtrl", function ($scope, $location, $log, userSrv, $uibModal) {
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

    $scope.resetPassword = function () {
        $scope.email = "";
        $scope.pwd = "";
        var modalInstance = $uibModal.open({
            templateUrl: "app/login/resetPassword.html",
            controller: "resetPwdModalCtrl"
        })

        modalInstance.result.then(function (User) {
            // $location.path("/main");
            $scope.users.push(activeUser);
        }, function () {
            console.log("user canceled reset Password");
        })
    };
})