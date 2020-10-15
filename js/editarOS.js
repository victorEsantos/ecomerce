$(function () {
    var divContent = $('#formulario');
    var botaoAdicionar = $('a[data-id="1"]');
    var i = 1;

    //Ao clicar em adicionar ele cria uma linha com novos campos
    $(botaoAdicionar).click(function () {
        var htmlProductString = '<div id="formulario" class="conteudoIndividual"><div class="form-row"><div class="form-group col-md-2"><label for="selectCategoria'+i+'">Categoria</label><select class="custom-select" id="selectCategoria'+i+'"><option selected>Choose...</option><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select></div><div class="form-group col-md-2"><label for="selectProduto'+i+'">Produto</label><select class="custom-select" id="selectProduto'+i+'"><option selected>Choose...</option><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select></div><div class="form-group col-md-2"><label for="inputQtd'+i+'">Quantidade</label><input type="number" class="form-control" id="inputQtd'+i+'" placeholder="Quantidade0"></div><div class="form-group col-md-4"><label for="inputObs'+i+'">Observação</label><input type="text" class="form-control" id="inputObs'+i+'" placeholder="Obs..."></div><div><label for="acoes"></label><br><div class="linksRemover"><a class="linkRemover badge badge-danger pointer" style="color:white">- Remover produto</a></div></div></div></div>';

        $(htmlProductString).appendTo(divContent);
        $('#removehidden').remove();
        i++;
        $('<input type="hidden" name="quantidadeCampos" value="' + i + '" id="removehidden">').appendTo(divContent);
    });

    //Cliquando em remover a linha é eliminada
    $('#formulario').on('click', '.linkRemover', function () {
        $(this).parents('.conteudoIndividual').remove();
        i--;
    });
});

function clearAllFields(){
    var fieldElements = document.querySelectorAll(".conteudoIndividual");

    for(var i = 0; i < fieldElements.length; i++){
        fieldElements[i].remove();
    }

    var inputNome = document.querySelector("#inputNome");
    inputNome.value = "";

    var inputLastName = document.querySelector("#inputLastName");
    inputLastName.value = ""; 

    var inputEmail = document.querySelector("#inputEmail");
    inputEmail.value = ""; 

    var inputCpf = document.querySelector("#inputCpf");
    inputCpf.value = ""; 

    var inputRua = document.querySelector("#inputRua");
    inputRua.value = ""; 

    var inputCidade = document.querySelector("#inputCidade");
    inputCidade.value = ""; 

    var inputEstado = document.querySelector("#inputEstado");
    inputEstado.value = "0";

    var inputCep = document.querySelector("#inputCep");
    inputCep.value = "";

    var gridCheck = document.querySelector("#gridCheck");
    gridCheck.checked = false;

    
    var selectCategoria0 = document.querySelector("#selectCategoria0");
    selectCategoria0.value = "0";

    
    var selectProduto0 = document.querySelector("#selectProduto0");
    selectProduto0.value = "0";

    var inputQtd0 = document.querySelector("#inputQtd0");
    inputQtd0.value = "";

    var inputObs0 = document.querySelector("#inputObs0");
    inputObs0.value = "";

}


