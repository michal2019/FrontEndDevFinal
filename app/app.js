var app = angular.module("manageJobsApp", ["ngRoute", "ngImageInputWithPreview", "ngAnimate", "ngTouch", "ui.bootstrap", "chart.js"]);

app.config(function ($routeProvider) {

  $routeProvider.
    when("/", {
      templateUrl: "app/home/home.html",
      controller: "homeCtrl"
    }).when("/about", {
      templateUrl: "app/home/about.html",
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
    }).when("/tips/searchtips", {
      templateUrl: "app/tips/searchtips.html",
      controller: "tipsCtrl"
    }).when("/tips/cvtips", {
      templateUrl: "app/tips/cvtips.html",
      controller: "tipsCtrl"
    }).when("/recommendations/", {
      templateUrl: "app/recommendations/recommendations.html",
    }).when("/main", {
      templateUrl: "app/main/main.html",
    }).when("/jobReplies/", {
      templateUrl: "app/jobReplies/jobReplies.html",
      controller: "jobRepliesCtrl"
    }).when("/jobReplies/:id", {
      templateUrl: "app/jobReplies/updateOrDeleteReply.html",
      controller: "updateOrDeleteReplyCtrl"
    }).when("/jobNotifications/", {
        templateUrl: "app/jobNotifications/jobNotifications.html",
        controller: "jobNotificationsCtrl"
      });
});