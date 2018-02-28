app.controller('dadosCtrl',['$scope', '$window', '$location','$rootScope', 'requests',
function dadosCtrl($scope,$window,$location,$rootScope, requests) {

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

            let dadosEstabelecimento = (pos) ? $scope.dadosEstabelecimento[node][pos] : $scope.dadosEstabelecimento[node];

            for (let property in dadosEstabelecimento) {
                if (dadosEstabelecimento.hasOwnProperty(property)) {
                    if(dadosEstabelecimento[property]) areFilled = true;
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


