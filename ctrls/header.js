app.controller('headerCtrl',['requests', '$scope','$window','$route', '$location', function headerCtrl(requests, $scope,$window,$route,$location) {

    $scope.input = {};

    //pega as informações do usuário
    requests.getUserInfo($window.sessionStorage)
    .then(function(data) { 
        $scope.userInfo = data;
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    //função usada para verificar string digitada no typeahead e verificar se existe na lista
    let substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            let matches, substringRegex;

            matches = [];

            substrRegex = new RegExp(q, 'i');

            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    //pega as informações para criar a lista de ECs
    requests.getEstabelecimentos($window.sessionStorage)
    .then(function(data) { 
        $scope.listaEstabelecimentos = [];

        //faz um looping na resposta para criar um array de estabelecimentos
        for(let estabelecimento of data.listaEstabelecimento){
            let el = {};
            el = {
                numeroEc:estabelecimento.numeroEc,
                string:estabelecimento.tipoEstabelecimento + ' - '+ estabelecimento.numeroEc +' - '+ estabelecimento.razaoSocial +' - '+ estabelecimento.cnpj
            }
            //se o numero do elemento atual for igual ao numeroEc gravado na session, ele é exibido em primeiro na lista de ECs
            if(estabelecimento.numeroEc === Number($window.sessionStorage.getItem('numeroEc'))) {
                $scope.listaEstabelecimentos.unshift(el.string);
            } else{
                $scope.listaEstabelecimentos.push(el.string);
            }
            
        }
        
        //seta as configurações do typeahead (autocomplete)
        $('#the-basics .typeahead').typeahead(
            {
                hint: false,
                highlight: true,
                minLength: 0
            },
            {
                name: 'listaEstabelecimentos',
                source: substringMatcher($scope.listaEstabelecimentos),
                async: true
            }
        );
        //seta primeiro elemento do array como selecionado
        $('.typeahead').typeahead('val', $scope.listaEstabelecimentos[0]);

        $('.tt-menu').on("click",function(){
            let numEc = [];
            //pega o numero do EC na string do campo
            numEc = $('.typeahead').typeahead('val').split( ' ' );
            //seta o numeroEc selecionado
            $window.sessionStorage.setItem('numeroEc', numEc[2]);
            $window.sessionStorage.setItem('userId', numEc[2]);

            //pega os dados do estabelecimento
            requests.getDadosEstabelecimento($window.sessionStorage)
            .then(function(data) { 
                //recarrega a view
                $scope.dadosEstabelecimento = data;
                $route.reload();
            })
            .catch(function(err) { 
                console.log('err: '+err);
            });
        
        });
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    $scope.killSession = function(){
        $window.sessionStorage.clear();
        $window.location.reload();
    }

    $( document ).ready(function() {

        //ao clicar na lista de estabelecimentos, ele zera o campo
        $('#inputEstabelecimento').on("click",function(){
            $('.typeahead').typeahead('val', '');
        });

        $('#btnMenuBars').on('click',function(){
            event.stopPropagation();
            $('#menu-container').removeClass('hide-menu');
        })

        $(window).click(function() {
            $('#menu-container').addClass('hide-menu');
        });
        
        $('#menu-container').click(function(event){
            event.stopPropagation();
        });

    });

}]);


