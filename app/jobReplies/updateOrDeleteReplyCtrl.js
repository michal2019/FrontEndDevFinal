app.controller("updateOrDeleteReplyCtrl", function ($scope, $log, appliesSrv, $uibModalInstance) {

    // Calling the service to get the apply with the index
    // Notice how we are accessing $routeParams.id to get the dynamic part in the URL
    // appliesSrv.getApplyByIndex($routeParams.id).then(function (apply) {
    //     $scope.currentApply = apply;
    // }, function (err) {
    //     $log.error(err);
    // });
    $scope.invalidApply = false;

    $scope.currentApply = $scope.$resolve.selectedApply;

    $scope.cancelUpdateApply = function () {
        $uibModalInstance.dismiss();
    }

    $scope.updateApply = function () {
        if ($scope.currentApply.company && $scope.currentApply.title && $scope.currentApply.status) {
            appliesSrv.updateApply($scope.currentApply.id, $scope.currentApply.company, $scope.currentApply.title, $scope.currentApply.location, $scope.currentApply.status, $scope.currentApply.comment).then(function (updatedApply) {
                $log.info("Apply updated: " + JSON.stringify(updatedApply));
                // Closing the modal
                var deleteConfirm = false;
                $uibModalInstance.close(deleteConfirm);
            });
        } else {
            // alert("מלא שם חברה, תפקיד וסטאטוס!!!");
            $scope.invalidApply = true;
        }
    }

    $scope.deleteApply = function () {
        appliesSrv.deleteApply($scope.currentApply).then(function (deletedApply) {
            $log.info("Apply deleted: " + JSON.stringify(deletedApply));
            // Closing the modal with flag
            var deleteConfirm = true;
            $uibModalInstance.close(deleteConfirm);
            // $uibModalInstance.close(deletedApply);
        });
    }
});