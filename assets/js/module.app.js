var app = angular.module('tripagApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./views/main.html",
        css: './assets/css/main.css'
    })
    .when("/login", {
        templateUrl : "./views/login.html",
        css: './assets/css/login.css'
    })
    .when("/recuperar", {
        templateUrl : "./views/recuperar.html",
        css: './assets/css/login.css'
    })
    .when("/redefinir", {
        templateUrl : "./views/redefinir.html",
        css: './assets/css/login.css'
    })
});