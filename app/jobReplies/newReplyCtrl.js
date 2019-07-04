
app.controller("newReplyCtrl", function ($scope, appliesSrv, $log, $uibModalInstance) {

    $scope.invalidApply = false;
    $scope.company = "";
    $scope.title = "";
    $scope.location = "";
    $scope.status = "";


    $scope.addApply = function () {
        $scope.status = $scope.value;
        if ($scope.company && $scope.title && $scope.status) {
            appliesSrv.addApply($scope.company, $scope.title, $scope.location, $scope.status).then(function (newApply) {
                $log.info("new apply added: " + JSON.stringify(newApply));
    
                // Closing the modal
                $uibModalInstance.close(newApply);
            });    
        } else {
            // alert("מלא שם חברה, תפקיד וסטאטוס!!!");
            $scope.invalidApply = true;
        }
    }


    $scope.cancelNewApply = function () {
        $scope.company = "";
        $scope.title = "";
        $scope.location = "";
        $scope.status = "";
        $uibModalInstance.dismiss();
    }


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