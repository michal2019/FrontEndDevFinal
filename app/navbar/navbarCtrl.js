
app.controller("navbarCtrl", function ($scope, userSrv, $location, appliesSrv, $q, $http) {

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

    function getNotificationMs() {
        var async = $q.defer();

        $http.get("app/data/app.json").then(function (res) {
            // on success
            async.resolve(res.data.update_timeout_in_ms);
        }, function (err) {
            $log.error(err);
            async.reject(err);
        });

        return async.promise;
    }


    $scope.userAsnotifications = false;
    $scope.userNotifications = [];
    updateUserNotification = function (userApplies) {
        var currentTime = new Date().getTime();
        getNotificationMs().then(function (ms) {
            for (var i = 0; i < userApplies.length; i++) {
                let updateTime = userApplies[i].updateTime.getTime();
                if (currentTime - updateTime > ms && userApplies[i].status != Notafit) { //notification after 7 days not updated in ms and != Notafit
                    $scope.userNotifications.push(userApplies[i]);
                }
                if ($scope.userNotifications.length > 0) {
                    $scope.userAsnotifications = true;
                }
            }
        }, function (err) {
            $log.error(err);
        });
    }
})
