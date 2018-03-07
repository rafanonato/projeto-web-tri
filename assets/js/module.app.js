import { url } from "inspector";

//declarando module
var app = angular.module('tripagApp', ["ngRoute"], ['config']);

app.constant('local', 'localhost:8000')
app.constant('production', 'localhost:8082')


//setando as configurações de routes
app.config(function($routeProvider, someServiceProvider) {

    someServiceProvider.setUrl(url);

    $routeProvider
    .when("/", {
        templateUrl : "./views/estabelecimento.html",
        controller : "dadosCtrl",
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
        controller : "dadosCtrl",
        css: './assets/css/main.css'
    })
    .when("/enderecos", {
        templateUrl : "./views/enderecos.html",
        controller : "dadosCtrl",
        css: './assets/css/main.css'
    })
    .when("/produtos-e-taxas", {
        templateUrl : "./views/produtos-e-taxas.html",
        controller : "dadosCtrl",
        css: './assets/css/main.css'
    })
    .when("/equipamentos", {
        templateUrl : "./views/equipamentos.html",
        controller : "dadosCtrl",
        css: './assets/css/main.css'
    })
    .when("/suporte", {
        templateUrl : "./views/suporte.html",
        controller : "suporteCtrl",
        css: './assets/css/main.css'
    })
    .when("/suporte/adicionar", {
        templateUrl : "./views/adicionar-solicitacao.html",
        controller : "suporteCtrl",
        css: './assets/css/main.css'
    })
    .when("/agenda", {
        templateUrl : "./views/agenda.html",
        controller : "financeiroCtrl",
        css: ['./assets/css/main.css','./assets/css/calendario.css']
    })
    .when("/movimentacoes-diarias", {
        templateUrl : "./views/movimentacoes-diarias.html",
        controller : "financeiroCtrl",
        css: ['./assets/css/main.css']
    })
    .when("/usuarios", {
        templateUrl : "./views/listar-usuarios.html",
        controller : "usuariosCtrl",
        css: ['./assets/css/main.css']
    })
});