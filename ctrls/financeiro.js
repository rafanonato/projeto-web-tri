app.controller('financeiroCtrl',['$scope', '$window', '$routeParams', 'requests',
function financeiroCtrl($scope, $window, $routeParams, requests) {

    //pega as configurações parametrizadas
    requests.getConfig()
    .then(function(data) {
        $scope.dadosConfig = data;

    })
    .catch(function(err) {
        console.log('err: '+err);
    });
    
    $scope.selectedDate = $routeParams.data;

    $scope.navDate = function(dir){
        
        let d = $scope.selectedDate.split('-');
        d = new Date(d[1]+'/'+d[0]+'/'+d[2]);

        if(dir === 'next'){
            d.setDate(d.getDate() + 1);
        } else {
            d.setDate(d.getDate() - 1);
        }
        
        return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
    }
    
    //pega as configurações parametrizadas
    requests.getDadosMovDia($window.sessionStorage,$scope.selectedDate)
    .then(function(data) {
        $scope.dadosMovDia = data;
    })
    .catch(function(err) {
        console.log('err: '+err);
    });

}]);
