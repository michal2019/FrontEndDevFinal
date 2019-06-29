
app.controller("jobRepliesCtrl", function($scope, userSrv, $location, appliesSrv/*, $uibModal*/) {

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
   }

    $scope.user = userSrv.getActiveUser();

    appliesSrv.getActiveUserApplies().then(function(applies) {
        $scope.applies = applies;
    });

    // // function for opening the modal using UI Bootstrap
    // $scope.openNewRecipeModal = function() {
    //     var modalInstance = $uibModal.open({
    //         templateUrl: "app/recipes/newRecipe.html",
    //         controller: "newRecipeCtrl"
    //     });

    //     modalInstance.result.then(function(newApply) {
    //         // this will wake in case the user added a new recipe
    //         $scope.recipes.push(newApply);
    //     }, function() {
    //         // this will wake up in case the user canceled the new recipe
    //         console.log("user canceled new applie");
    //     })
    // }

})

// $scope.query = "";
// $scope.filterCar = function(car) {
//   // if (!$scope.query) {
//   //   return true;
//   // }
  
//   // converting to lower case to do a case insensitive comparison
//   if (car.brand.toLowerCase().includes($scope.query.toLowerCase()) || 
//       car.model.toLowerCase().includes($scope.query.toLowerCase())) {
//     return true;
//   } else {
//     return false;
//   }
// };

// $scope.orderProp = "";
// $scope.orderReverse = false;
// $scope.orderByProp = function(propName) {
  
//   if ($scope.orderProp !== propName) {
//     // Clicking on this column for the first time
//     // I want an ascending order so putting false in reverse
//     $scope.orderProp = propName;
//     $scope.orderReverse = false;
//   } else {
//     // Clicking on the same columns - reversing the order
//     $scope.orderReverse = !$scope.orderReverse;
//   }
// };

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
