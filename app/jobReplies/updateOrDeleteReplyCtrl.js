app.controller("updateOrDeleteReplyCtrl", function ($scope, $log, appliesSrv, $uibModalInstance) {

    // Calling the service to get the apply with the index
    // Notice how we are accessing $routeParams.id to get the dynamic part in the URL
    // appliesSrv.getApplyByIndex($routeParams.id).then(function (apply) {
    //     $scope.currentApply = apply;
    // }, function (err) {
    //     $log.error(err);
    // });

    $scope.currentApply = $scope.$resolve.selectedApply;

    $scope.cancelUpdateApply = function () {
        $uibModalInstance.dismiss();
    }

    $scope.updateApply = function () {
        appliesSrv.updateApply($scope.currentApply.id, $scope.currentApply.company, $scope.currentApply.title, $scope.currentApply.location, $scope.currentApply.status).then(function (updatedApply) {
            $log.info("Apply updated: " + JSON.stringify(updatedApply));
            // Closing the modal
            $uibModalInstance.close(updatedApply);
        });

    }

    $scope.deleteApply = function () {
        appliesSrv.deleteApply($scope.currentApply).then(function (deletedApply) {
            $log.info("Apply deleted: " + JSON.stringify(deletedApply));
            // Closing the modal
            $uibModalInstance.close(deletedApply);
        });
    }
});