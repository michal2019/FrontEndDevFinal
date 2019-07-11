app.controller("resetPwdModalCtrl", function ($scope, $uibModalInstance, userSrv) {

    $scope.email = "";

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.ok = function () {
        userSrv.resetPassword($scope.email).then(function () {
             
        });
        $uibModalInstance.dismiss();    
    };

});