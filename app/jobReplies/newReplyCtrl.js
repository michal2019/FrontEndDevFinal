
app.controller("newReplyCtrl", function($scope, appliesSrv, $log, $uibModalInstance) {

    $scope.company = "";
    $scope.title = "";
    $scope.location = "";
    $scope.status = "";
  

    $scope.addApply = function() {
        $scope.status = $scope.value;
        appliesSrv.addApply($scope.company, $scope.title, $scope.location, $scope.status).then(function(newApply) {
            $log.info("new apply added: " + JSON.stringify(newApply));

            // Closing the modal
            $uibModalInstance.close(newApply);
       });
    }

    $scope.cancelNewApply = function() {
        $scope.company = "";
        $scope.title = "";
        $scope.location = "";
        $scope.status = "";
        $uibModalInstance.dismiss();
    }

})