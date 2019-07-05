app.controller("homeCtrl", function($scope, userSrv, $location) {
    userSrv.logout();
})
