
app.controller("navbarCtrl", function ($scope, userSrv, $location, appliesSrv) {

    $scope.isLoggedIn = function () {
        return userSrv.isLoggedIn();
    }

    $scope.logout = function () {
        userSrv.logout();
        $location.path("/");
    }

    if ($scope.isLoggedIn()) {
        appliesSrv.getActiveUserApplies().then(function (applies) {
            $scope.applies = applies;
            if ($scope.applies) {
                updateUserNotification($scope.applies);
            }
        });
    }

    $scope.userAsnotifications = false;
    $scope.userNotifications = [];
    updateUserNotification = function (userApplies) {
        var currentTime = new Date().getTime();
        for (var i = 0; i < userApplies.length; i++) {
            let updateTime = userApplies[i].updateTime.getTime();
            if (currentTime - updateTime > 259200000) { //notification after 3 day not updated in ms
                $scope.userNotifications.push(userApplies[i]);
            }
        }
        if ($scope.userNotifications.length > 0) {
            $scope.userAsnotifications = true;
        }
    }



})
