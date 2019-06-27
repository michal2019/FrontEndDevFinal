app.controller("tipsCtrl", function ($scope, $location) {

    $scope.searchTips = function (){
        $location.path("/tips/searchtips");
    }

    $scope.cvTips = function (){
        $location.path("/tips/cvtips");
    }

})
