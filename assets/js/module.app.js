//declarando module
var app = angular.module('tripagApp', ["ngRoute"]);

//setando as configurações de routes
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./views/estabelecimento.html",
        controller : "mainCtrl",
        css: './assets/css/main.css'
    })
    .when("/login", {
        templateUrl : "./views/login.html",
        controller : "loginCtrl",
        css: './assets/css/login.css'
    })
    .when("/recuperar", {
        templateUrl : "./views/recuperar.html",
        controller : "recuperarCtrl",
        css: './assets/css/login.css'
    })
    .when("/redefinir", {
        templateUrl : "./views/redefinir.html",
        controller : "redefinirCtrl",
        css: './assets/css/login.css'
    })
    .when("/estabelecimento", {
        templateUrl : "./views/estabelecimento.html",
        controller : "mainCtrl",
        css: './assets/css/main.css'
    })
    .when("/enderecos", {
        templateUrl : "./views/enderecos.html",
        controller : "mainCtrl",
        css: './assets/css/main.css'
    })
    .when("/produtos-e-taxas", {
        templateUrl : "./views/produtos-e-taxas.html",
        controller : "mainCtrl",
        css: './assets/css/main.css'
    })
    .when("/equipamentos", {
        templateUrl : "./views/equipamentos.html",
        controller : "mainCtrl",
        css: './assets/css/main.css'
    })
});