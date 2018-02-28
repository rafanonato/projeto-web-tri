app.controller('dadosCtrl',['$scope', '$window', '$location','$rootScope', 'requests', 
function dadosCtrl($scope,$window,$location,$rootScope, requests) {

    //verifica se o usuário está autenticado e o envia para a tela de login
    if (!$window.sessionStorage.getItem('userId')){
        $location.path('login');
    }

    //pega as configurações parametrizadas
    requests.getConfig()
    .then(function(data) { 
        $scope.dadosConfig = data;

    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    $scope.dadosEstabelecimento = {};
    $scope.equipamentoAtual = [];
    $rootScope.modalDomicilio = {};

    //pega os dados do estabelecimento
    requests.getDadosEstabelecimento($window.sessionStorage)
    .then(function(data) { 
        $scope.dadosEstabelecimento = data;

        $scope.showItemEstabelecimento = function(node,pos){

            let areFilled = false;

            if(pos){
                for (let property in $scope.dadosEstabelecimento[node][pos]) {
                    if ($scope.dadosEstabelecimento[node][pos].hasOwnProperty(property)) {
                        if($scope.dadosEstabelecimento[node][pos][property]) areFilled = true;
                    }
                }

            } else {

                for (let property in $scope.dadosEstabelecimento[node]) {
                    if ($scope.dadosEstabelecimento[node].hasOwnProperty(property)) {
                        if($scope.dadosEstabelecimento[node][property]) areFilled = true;
                    }
                }

            }

            return areFilled;
    
        }
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    //pega as informações de produtos e taxas
    requests.getDadosProdutosTaxas($window.sessionStorage)
    .then(function(data) { 
        $scope.dadosProdutosTaxas = data;

        $scope.showItemProdutosTaxas = function(node,pos){

            let ativo = $scope.dadosProdutosTaxas[node][pos].ativo;
            return ativo;
    
        }

    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    //pega as informações de equipamentos
    requests.getDadosEquipamentos($window.sessionStorage)
    .then(function(data) { 
        $scope.dadosEquipamentos = data;

        $scope.showItemEquipamentos = function(node,pos){

            let ativo = $scope.dadosEquipamentos[node][pos].ativo;
            return ativo;
    
        }
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    $scope.paginacaoEquipamento = function(dir,index){
        if(dir === "prev" && $scope.equipamentoAtual[index] > 0){
            $scope.equipamentoAtual[index]--;
        } else if(dir === "next" && $scope.equipamentoAtual[index] < $scope.dadosEquipamentos.equipamentos[0].infos.equipamentos.length -1){
            $scope.equipamentoAtual[index]++;
        }
    }

    $scope.openModal = function(pos){
        $rootScope.modalDomicilio = $scope.dadosProdutosTaxas.produtosETaxas[0].infos.taxasContratadas[pos];
        $('#modal-domicilio').modal();
    }

}]);


