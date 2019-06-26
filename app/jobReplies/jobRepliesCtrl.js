app.controller("jobRepliesCtrl", function($scope, userSrv, $location) {

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.user = userSrv.getActiveUser();

    // recipeSrv.getActiveUserRecipes().then(function(recipes) {
    //     $scope.recipes = recipes;
    // });
   

})