app.controller('headerCtrl',['requests', '$scope', function headerCtrl(requests, $scope) {

    $scope.input = {};

    //pega as informações do usuário
    requests.getUserInfo()
    .then(function(data) { 
        $scope.userInfo = data;
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    //pega as informações do estabelecimento
    requests.getEstabelecimentos()
    .then(function(data) { 
        $scope.input.estabelecimentos = [];

        for(let estabelecimento of data){
            console.log(estabelecimento)
            $scope.input.estabelecimentos.push(estabelecimento.role + ' - '+ estabelecimento.id +' - '+ estabelecimento.name +' - '+ estabelecimento.cnpj);
        }

        $('#the-basics .typeahead').typeahead(
            {
                hint: true,
                highlight: true,
                minLength: 0
            },
            {
                name: 'estab',
                source: substringMatcher($scope.input.estabelecimentos)
            }
        );
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

}]);


