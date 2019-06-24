var app = angular.module("manageJobsApp", ["ngRoute"]);

app.config(function($routeProvider) {
  
  $routeProvider.
    when("/", {
      templateUrl: "app/home/home.html",
      controller: "homeCtrl"
    }).when("/login", {
      templateUrl: "app/login/login.html",
      controller: "loginCtrl"
    }).when("/signup", {
        templateUrl: "app/signup/signup.html",
        controller: "signupCtrl"
      }).when("/logout", {
        templateUrl: "app/logout/logout.html",
        controller: "logoutCtrl"
      }).when("/tips/", {
      templateUrl: "app/tips/tips.html",
      controller: "tipsCtrl"
    }).when("/searchtips/", {
        templateUrl: "app/tips/searchtips/searchtips.html",
      }).when("/cvtips/", {
        templateUrl: "app/tips/cvtips/cvtips.html",
      });
  
});