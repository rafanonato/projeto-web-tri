
app.controller('recuperarCtrl', ['$scope', '$window', '$http', '$q', '$location','$rootScope', 'requests', 
function recuperarCtrl($scope, $window, $http, $q, $location,$rootScope, requests) {

    if($rootScope.reloadView === true){
        $window.location.reload();
        $rootScope.reloadView = false;
        console.log('reloaded')
    }

    //verifica se o usuário está autenticado e o envia para a página interna 
    if ($window.sessionStorage.getItem('userId')){
        $location.path('/');
    }

    //carrega o js do captcha (precisa ser carregado em cada controller)
    $.getScript("https://www.google.com/recaptcha/api.js");
    
    $scope.input = {user:''}
    $scope.inputStatus = '';

    //pega as configurações da aplicação
    requests.getConfig()
    .then(function(data) { 
        $scope.config = JSON.stringify(data);
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    //função executada no submit do form de login (executa o captcha)
    $scope.onSubmitRec = function(){
        grecaptcha.execute();
    }

    //função executada no submit do form de login (depois do captcha)
    $scope.checkInputs = function(){
        $rootScope.reloadView = true;

        //sempre reseta o captcha (pode dar erro se não for resetada)
        grecaptcha.reset();

        $scope.inputStatus = '';

        //faz a verificação dos campos e dá feedback visual em caso de erro 
        if($scope.input.user){

            let regCNPJ = new RegExp('\\d{2}.?\\d{3}.?\\d{3}\\/?\\d{4}-?\\d{2}', 'g');
            let regEMAIL = new RegExp('^[a-zA-Z0-9.!#$%&\'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$','g');

            let inputObj = {'email':'','cnpj':'', 'numeroEc':''};

            //testa RegExp e em caso positivo, seta a propriedade do objeto correspondente
            if(regEMAIL.test($scope.input.user)){
                inputObj.email = $scope.input.user;
            }else if(regCNPJ.test($scope.input.user) && ($scope.input.user.length === 14 || $scope.input.user.length === 18)){
                inputObj.cnpj = $scope.input.user;
            } else {
                inputObj.numeroEc = $scope.input.user;
            }

            //checa o usuário e pega o email (se ok)
            requests.recover(inputObj)
            .then(function(data) { 

                $scope.input = {user:''};
                //exibe mensagem de sucesso ou erro
                $scope.inputStatus = 'OK';
                console.log(data)
                $('.box-login h6').text('Informação Importante');
                $('.box-login p').text('Foi enviado um link para o email abaixo, com as instruções para recuperação da sua senha de acesso.');
                $('.feedback').text(data.email);

            })
            .catch(function(err) { 
                console.log('err: '+err);

                if(err.status === 404) {
                    $scope.inputStatus = 'NOK';
                    $scope.input = {user:'',pass:''};
                }
            });

        }
    }

    $( document ).ready(function() {
        let typePass = 'password';
    
        //ao clicar no ícone 'eye' o script alterna o type entre 'senha' e 'text'
        $("#showPass").on("click", function() {
            typePass = (typePass === "text")? 'password':'text';
            $('#inputPass')[0].type = typePass;
        });    
        
        //ao focar, limpar feedbacks visuais de erro
        $('.form-control').on("click",function(){
            angular.element($('.form-control')).scope().inputStatus = '';
        });
    
    });

}]);

//depois que o captcha confirma que o usuário não é robô, ele executa a função checkInputs()
function afterCaptcha(token) {
    console.log('afterCaptcha');
    angular.element($('.form-control')).scope().checkInputs();
}