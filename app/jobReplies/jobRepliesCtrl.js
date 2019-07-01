
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
        // converting to lower case to do a case insensitive comparison
        if (apply.company.toLowerCase().includes($scope.query.toLowerCase()) ||
            apply.title.toLowerCase().includes($scope.query.toLowerCase()) ||
            apply.location.toLowerCase().includes($scope.query.toLowerCase()) ||
            apply.status.toLowerCase().includes($scope.query.toLowerCase())) {
            return true;
        } else {
            return false;
        }
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
    $scope.labels = ["ראיונות", "חוסר התאמה"];
    $scope.options = {
        legend: {
            display: true
        }
    }
    $scope.colours = ['#72C02C', '#3498DB'];


    $scope.getChartData = function () {
        var interviews = 0;
        var notAfit = 0;

        for (var i = 0; i < $scope.applies.length; i++) {
            if ($scope.applies[i].status.includes("ראיון")) {
                interviews++;
            } else {
                notAfit++;
            }
        }

        data[0] = interviews;
        data[1] = notAfit;
        return data;
    }
});

// $scope.selectedCar = null;
// $scope.onSelectCar = function(car) {
//   if ($scope.selectedCar === car) {
//     $scope.selectedCar = null;
//   } else {
//     $scope.selectedCar = car;
//   }
// }

// $scope.openCarDetails = function(car) {

//   var index = $scope.cars.indexOf(car);
//   $location.path("/cars/" + index);

// }

// // $scope.classes = ["red", "bg-blue"];
