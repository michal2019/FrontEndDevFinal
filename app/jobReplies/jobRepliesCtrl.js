
app.controller("jobRepliesCtrl", function ($scope, userSrv, $location, appliesSrv, $uibModal) {

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.user = userSrv.getActiveUser();

    appliesSrv.getActiveUserApplies().then(function (applies) {
        $scope.applies = applies;
    });

    $scope.query = "";
    $scope.filterApply = function (apply) {
        if ($scope.query) {
            // converting to lower case to do a case insensitive comparison
            if (apply.company.toLowerCase().includes($scope.query.toLowerCase()) ||
                apply.title.toLowerCase().includes($scope.query.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        }
        else {
           return true;}
    }

    $scope.orderProp = "";
    $scope.orderReverse = false;
    $scope.orderByProp = function (propName) {

        if ($scope.orderProp !== propName) {
            // Clicking on this column for the first time
            // I want an ascending order so putting false in reverse
            $scope.orderProp = propName;
            $scope.orderReverse = false;
        } else {
            // Clicking on the same columns - reversing the order
            $scope.orderReverse = !$scope.orderReverse;
        }
    }

    // function for opening the modal using UI Bootstrap
    $scope.openNewApplyModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl: "app/jobReplies/newReply.html",
            controller: "newReplyCtrl"
        });

        modalInstance.result.then(function (newApply) {
            // this will wake in case the user added a new apply
            $scope.applies.push(newApply);
        }, function () {
            // this will wake up in case the user canceled the new apply
            console.log("user canceled new apply");
        })
    }

    // Chart.JS
    var data = [];
    $scope.labels = ["פנייה במייל", "מוזמן לראיון", "ממתין לתשובת המראיינים", "לא מתאים", "מרכז הערכה", "מתאים", "תקן הוקפא"];
    $scope.options = {
        legend: {
            display: true
        }
    }
    $scope.colors = ['#b4d993', '#3498DB', '#436bb5', '#166958', '#11d7d8', '#998099', '#bcb1c7'];


    $scope.getChartData = function () {
        var mails = 0;
        var interviews = 0;
        var waiting = 0;
        var notAfit = 0;
        var exams = 0;
        var fits = 0;
        var freezes = 0;

        for (var i = 0; i < $scope.applies.length; i++) {
            switch ($scope.applies[i].status) {
                case '1':
                    mails++;
                    break;
                case '2':
                    interviews++;
                    break;
                case '3':
                    waiting++;
                    break;
                case '4':
                    notAfit++;
                    break;
                case '5':
                    exams++;
                    break;
                case '6':
                    fits++;
                    break;
                case '7':
                    freezes++;
                    break;
                default:
            }
        }

        data[0] = mails;
        data[1] = interviews;
        data[2] = waiting;
        data[3] = notAfit;
        data[4] = exams;
        data[5] = fits;
        data[6] = freezes;
        return data;
    }
    $scope.labels = ["פנייה במייל", "מוזמן לראיון", "ממתין לתשובת המראיינים", "לא מתאים", "מרכז הערכה", "מתאים", "תקן הוקפא"];
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
        if(deleteConfirm) 
        {
            $scope.applies.splice(index, 1);
        }  
        }, function () {
            // this will wake up in case the user canceled the new apply
            console.log("user canceled update apply");
        })
    }

});



