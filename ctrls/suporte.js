app.controller('solicitacaoCtrl',['$scope', '$window', '$location','$rootScope', 'requests', 
function solicitacaoCtrl($scope,$window,$location,$rootScope, requests) {

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

    $scope.msgFile = "";
    var filesToUpload = [];

    //pega as informações de solicitações
    requests.getDadosSolicitacoes($window.sessionStorage)
    .then(function(data) { 
        $scope.dadosSolicitacoes = data;

        $scope.showItemSolicitacoes = function(node,pos){

            let ativo = $scope.dadosSolicitacoes[node][pos].ativo;
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

    $scope.openModal = function(type,pos){
        if(type === "novoChamado"){
            $rootScope.modalNovoChamado = $scope.responseNovoChamado;
            $rootScope.modalNovoChamadoStatus = $scope.chamadoStatus;
            $rootScope.$apply();
            $('#modal-novochamado').modal();
        }
        
    }

    requests.getTempoSolicitacao($window.sessionStorage)
    .then(function(data) { 
        $scope.dadosTempoSolicitacao = data;
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    ////////////////////// UPLOAD DE ARQUIVOS

    $.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
        var fileIdCounter = 0;
    
        this.closest(".files").change(function (evt) {
            var output = [];
            let validFiles = 0;
    
            for (var i = 0; i < evt.target.files.length; i++) {
                fileIdCounter++;
                var file = evt.target.files[i];
                var fileId = sectionIdentifier + fileIdCounter;
    
                filesToUpload.push({
                    id: fileId,
                    file: file
                });

                for(let tipo of $scope.dadosConfig.solicitacao.tiposArquivos){
                    if(file.type === tipo && file.size <= 10000000){
                        validFiles++;
                        var removeLink = "<a class=\"removeFile\" href=\"#\" data-fileid=\"" + fileId + "\"><i class='fas fa-times-circle'></i></a>";
                        output.push("<div class='col-md-2'><div class='insertedFile'><i class='fas fa-copy'></i></div><div class='insertedFileName'>", 
                        escape(file.name), "</div>", removeLink, "</div> ");
                    }
                }                
                
            };
            if(validFiles === evt.target.files.length){
                $(this).children(".fileList")
                .append(output.join(""));
                $scope.msgFile = "Arquivos carregados com sucesso";
            } else {
                $scope.msgFile = "Você tentou carregar um arquivo não suportado ou que excede o tamanho máximo de 10mb.";
            }
            $('#msgFile').val($scope.msgFile);

            evt.target.value = null;
        });
    
        $(this).on("click", ".removeFile", function (e) {
            e.preventDefault();
    
            var fileId = $(this).parent().children("a").data("fileid");
            
            for (var i = 0; i < filesToUpload.length; ++i) {
                if (filesToUpload[i].id === fileId)
                    filesToUpload.splice(i, 1);
            }
    
            $(this).parent().remove();
        });
    
        this.clear = function () {
            filesToUpload.length = 0;
            
            $(this).children(".fileList").empty();
        }
    
        return this;
    };

    $scope.submitNovoChamado = function(dataForm){

        var formData = new FormData();
        for(var i=0; i < filesToUpload.length; i++){
            formData.append("files", filesToUpload[i].file);
        }

        formData.append("tipo", dataForm.tipo);
        formData.append("numero", dataForm.numero);
        formData.append("detalhes", dataForm.detalhes);

        $.ajax({
            url: "http://localhost:7010/createCase",
            data: formData,
            processData: false,
            contentType: false,
            encType: "multipart/form-data",
            type: "POST",
            success: function (data) {
                $scope.responseNovoChamado = data;
                $scope.chamadoStatus = 'OK';
                $scope.openModal('novoChamado',0);
                $scope.files1Uploader.clear();
                $("#myform").trigger('reset'); 
            },
            error: function (data) {
                $scope.responseNovoChamado = data.responseText;
                $scope.chamadoStatus = 'NOK';
                $scope.openModal('novoChamado',0)
            }
        });


    };
    
    (function () {
    
        $scope.files1Uploader = $("#files1").fileUploader(filesToUpload, "files1");

        $("#inputFile").on('click',function(){
            $("input[type='file']").trigger('click');
        })
    })()

}]);

