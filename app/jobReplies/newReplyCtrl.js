
app.controller("newReplyCtrl", function ($scope, appliesSrv, $log, $uibModalInstance) {

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
            alert("מלא שם חברה, תפקיד וסטאטוס!!!");
        }
    }


    $scope.cancelNewApply = function () {
        $scope.company = "";
        $scope.title = "";
        $scope.location = "";
        $scope.status = "";
        $uibModalInstance.dismiss();
    }

})