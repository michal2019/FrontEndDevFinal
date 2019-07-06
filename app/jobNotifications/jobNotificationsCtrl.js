app.controller("jobNotificationsCtrl", function ($scope, appliesSrv, $uibModal) {

    $scope.getStatus = function (status) {
        return appliesSrv.getStatus(status);
    }

    $scope.onSelectApply = function (apply) {
        $scope.openUpdateApplyModal(apply);
    }

    $scope.openUpdateApplyModal = function (selectedApply) {
        var index = $scope.applies.indexOf(selectedApply);
        // $location.path("/jobReplies/" + index);
        var modalInstance = $uibModal.open({
            templateUrl: "app/jobReplies/updateOrDeleteReply.html",
            controller: "updateOrDeleteReplyCtrl",
            resolve: {
                selectedApply: selectedApply
            }
        });
        modalInstance.result.then(function (deleteConfirm) {
            if (deleteConfirm) {
                $scope.applies.splice(index, 1);
            }
        }, function () {
            // this will wake up in case the user canceled the new apply
            console.log("user canceled update apply");
        })
    }

    $scope.formatDate = function(d)
    {
        var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
        return dateString;
    }
})