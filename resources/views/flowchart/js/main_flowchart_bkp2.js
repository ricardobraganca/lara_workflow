//https://craftpip.github.io/jquery-confirm/
//https://github.com/sdrdis/jquery.flowchart


var main =(function(){

    var $flowchart;
    var operator_id_selected;

    $(document).ready(function() {

        load_draggable_div();
        set_elements_draggable();
        $('.sortable').sortable();


        let $edt_nome = $('#edt_nome');
        var data = {
            operators: {
            0: {
                top: 20,
                left: 20,
                properties: {
                title: 'Formulario de Entrada',
                inputs: {},
                outputs: {
                    output_1: {
                    label: '>>',
                    },
                }
                }
            },
            1: {
                top: 80,
                left: 300,
                properties: {
                title: 'Finalizado',
                inputs: {
                    input_1: {
                    label: '||',
                    },
                },
                outputs: {}
                }
            },
            }
        };

        $flowchart = $('#stage');
        $container = $flowchart.parent();
        // Apply the plugin on a standard, empty div...
        $flowchart.flowchart({
            data: data,
            defaultSelectedLinkColor: '#000055',
            grid: 10,
            multipleLinksOnInput: true,
            multipleLinksOnOutput: true
        });

        $flowchart.flowchart({
                                onOperatorSelect: function(operator_id){
                                    operator_id_selected = operator_id;
                                    //$edt_nome.val($flowchart.flowchart('getOperatorTitle', operator_id));
                                    add_outputs_li(operator_id)
                                    document.querySelector('#sel').innerHTML=operator_id;
                                    return true;
                                }
        })

        $('#btn_novo').on('click', function(){

            let $edt_nome = $('#edt_nome');

            if(!$edt_nome.val()){
                return false;
            }

            if(draggable_exists($edt_nome.val())){
                $.alert('Tarefa \"' + $edt_nome.val() + '\" já existe.');
                return false;
            }

            $.ajax({
                    url: $('#url_route').val(),
                    type: 'POST',
                    data: $('#form').serialize(),
                    dataType: 'json',
                    success: function(response){
                        addDragable(response.id, response.descricao);
                        $edt_nome.val('');
                        buscaDiv();
                    }
            });
        });


        $('#btn_atualizar').on('click', function(){

            if($edt_nome.val() && $flowchart.flowchart('getSelectedOperatorId')){
                update_operator(0);
                //$flowchart.flowchart('setOperatorTitle', $flowchart.flowchart('getSelectedOperatorId'), $edt_nome.val());
                $edt_nome.val('')
            }
        });

        $('#btn_deletar').on('click', function(){

            if($flowchart.flowchart('getSelectedOperatorId') != null || $flowchart.flowchart('getSelectedLinkId') != null){
                $.confirm({
                    title: 'Atenção',
                    content: 'Tem certeza que deseja excluír ?',
                    columnClass: 'small',
                    buttons: {
                        sim: function () {

                            $flowchart.flowchart('deleteSelected');
                            $.alert('Excluído com sucesso!!!');
                        },
                        não: function () {

                        }
                    }
                });
            }

        })

        $('#btn_salvar_projeto').on("click",function(){

            let dt = $flowchart.flowchart('getData');
            console.log(dt);
        })

        $('.tablink').each(function(_,obj){
            obj.addEventListener("click", function(evt){
                openTab(evt, this.innerHTML);
            });
        });

        $('#edt_nome').on('keyup',function(){
            buscaDiv();
        })

        $('#btn_add_trigger').on("click", function(e){
            e.preventDefault();
            addSorteableList($('#trigger').val());
        });

    });

    function create_operator(operator_id, title, label_input, label_output){

        var operatorData = {
            top: 30,
            left: 30,
            properties: {
                title: title,
                inputs: {
                    input_1: {
                        label: label_input,
                    }
                },
                outputs: {
                    output_1: {
                        label: label_output,
                    }
                }
            }
        };

        $flowchart.flowchart('createOperator', operator_id,operatorData);
    }

    function set_elements_draggable(){

        var $draggableOperators = $('.draggable_operator');
        $draggableOperators.draggable({
            cursor: "move",
            opacity: 0.7,
            // helper: 'clone',
            appendTo: 'body',
            zIndex: 1000,
            helper: function(e) {
                var $this = $(this);
                var data = getOperatorData($this);
                return $flowchart.flowchart('getOperatorElement', data);
            },
            stop: function(e, ui) {

                var $this = $(this);
                var elOffset = ui.offset;
                var containerOffset = $container.offset();
                if (elOffset.left > containerOffset.left &&
                    elOffset.top > containerOffset.top &&
                    elOffset.left < containerOffset.left + $container.width() &&
                    elOffset.top < containerOffset.top + $container.height()) {
                    var flowchartOffset = $flowchart.offset();
                    var relativeLeft = elOffset.left - flowchartOffset.left;
                    var relativeTop = elOffset.top - flowchartOffset.top;
                    var positionRatio = $flowchart.flowchart('getPositionRatio');
                    relativeLeft /= positionRatio;
                    relativeTop /= positionRatio;
                    var data = getOperatorData($this);
                    data.left = relativeLeft;
                    data.top = relativeTop;
                    $flowchart.flowchart('addOperator', data);
                    //$flowchart.flowchart('createOperator', nbId, data);
                }
            }
        });

    }

    function getOperatorData($element) {
        var nbInputs = parseInt($element.data('nb-inputs'), 10);
        var nbOutputs = parseInt($element.data('nb-outputs'), 10);
        var nbId = parseInt($element.data('nb-id'), 10);
        var nbTitle = $element.data('nb-title');
        var data = {
            properties: {
                title: nbTitle,
                inputs: {},
                outputs: {}
            }
        };

        data.properties.inputs['Input'] = {
            label: nbId + ""
        };

        data.properties.outputs['Output'] = {
            label: '>'
        };

        return data;
    }

    function addDragable(id_operator, title){

        $div_drag = $('.draggable_operators_divs');
        $div_header= document.createElement('div');
        $div_body= document.createElement('div');
        $btn_del = document.createElement('button');
        $element_drag = document.createElement('div');

        $btn_del.innerHTML='X';
        $btn_del.classList.add('w3-button');
        $btn_del.classList.add('w3-tiny');
        $btn_del.classList.add('w3-left');

        $btn_del.addEventListener('click', function(evt){

            var $obj_parent = this.parentNode;

            if(operator_in_stage( $obj_parent.getAttribute('data-nb-title')) ){
                $.alert('Tarefa em uso no fluxograma. Remova todas as ocorrências antes de excluir.');
                return false;
            }

            $.confirm({
                title: 'Atenção',
                content: 'Tem certeza que deseja excluir ?',
                columnClass: 'small',
                buttons: {
                    sim: function () {

                        $.ajax({
                            url: $('#url_route').val() + '/' + $obj_parent.getAttribute('data-nb-id'),
                            type: 'delete',
                            data: { _token: $("input[name='_token']")[0].value },
                            success: function(response){

                                if(response.status){

                                    $obj_parent.remove();
                                    $.alert(response.msg);
                                }else{

                                    $.alert(response.msg);
                                }
                            }
                        });

                    },
                    não: function () {

                    }
                }
            });




        });

        //$div_header.appendChild($btn_del);
        $element_drag.appendChild($btn_del);

        $element_drag.classList.add('draggable_operator');
       // $element_drag.classList.add('w3-card');
        $element_drag.classList.add('ui-draggable');
        $element_drag.classList.add('ui-draggable-handle');
        $element_drag.setAttribute('data-nb-id', id_operator);
        $element_drag.setAttribute('data-nb-inputs','1');
        $element_drag.setAttribute('data-nb-outputs','1');
        $element_drag.setAttribute('data-nb-title', title);
        $div_body.innerHTML=title;

        $element_drag.appendChild($div_body);
        $div_drag[0].appendChild($element_drag);
        set_elements_draggable();
    }

    function load_draggable_div(){

        $div_drag = $('.draggable_operators_divs');
        $div_drag[0].innerHTML="";

        $.ajax({
            url: $('#url_route').val(),
            type: 'get',
            success: function(response){
                   response.forEach(function(item, index){
                        addDragable(item.id, item.descricao);
                   });
            }
        })
    }

    function openTab(evt, Tabname) {
        var i, x, tablinks;
        x = document.getElementsByClassName("menuid");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < x.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" w3-gray", "");
        }
        document.getElementById(Tabname).style.display = "block";
        evt.currentTarget.className += " w3-gray";
      }

      function buscaDiv() {
        var input = document.getElementById("edt_nome");
        var filter = input.value.toLowerCase();
        var nodes = document.getElementsByClassName('draggable_operator');

        for (i = 0; i < nodes.length; i++) {
          if (nodes[i].innerText.toLowerCase().includes(filter)) {
            nodes[i].style.display = "block";
          } else {
            nodes[i].style.display = "none";
          }
        }
      }

        function operator_in_stage(title){

            let operators = $('.flowchart-operator-title');
            for(let i=0; i<operators.length; i++ ){

                if(title == operators[i].innerText){

                    return true;
                }
            }

            return false;
        }

        function draggable_exists(title){

            let drags = $('.draggable_operator')
            for(let i=0; i<drags.length; i++){
                console.log('t: ' + title + ' A: ' + drags[i].getAttribute('data-nb-title'))
                if(title == drags[i].getAttribute('data-nb-title')){

                    return true;
                }
            }
            return false;
        }

        function addSorteableList(text){

            $li = document.createElement('li');
            $span_del = document.createElement('span');
            $span_content = document.createElement('span');
            $del = document.createElement('a');
            $ul = document.querySelector('.sortable');

            $del.innerText="X";
            $del.classList.add('w3-button');
            $del.style.marginRight='5px';

            $list = $ul.querySelectorAll('.value');
            for(let i=0 ; i<$list.length ; i++){
                if($list[i].innerText == text ){
                    $.alert('Gatilho já ' + text + ' existe!!!');
                    return false;
                };
            }

            $del.addEventListener("click", function(){
                this.parentNode.parentNode.remove()
            });

            $span_del.appendChild($del);

            $span_content.classList.add('value');
            $span_content.innerText=text;

            $li.appendChild($span_del);
            $li.appendChild($span_content);

            $ul.appendChild($li);
            document.querySelector('#trigger').value='';
            $('.sortable').sortable();
        }

        function update_operator(id_operator){

            let data_op = $flowchart.flowchart('getOperatorData', operator_id_selected)

            $list = document.querySelectorAll('.value');

            let outputs = {};
            for(let i=0 ; i<$list.length ; i++){
                let obj_out = new Object({ [$list[i].innerText]: { label: $list[i].innerText } });
                Object.assign(outputs , obj_out);
            }
            data_op.properties.outputs=outputs;

            $flowchart.flowchart('setOperatorData', operator_id_selected, data_op);
        }

        function add_outputs_li(operator_id){

            let data_op = $flowchart.flowchart('getOperatorData', operator_id);
            let outputs = data_op.properties.outputs;

            document.querySelector('.sortable').innerHTML='';
            $.each(outputs, function(index, value){
                console.log(value.label);
                addSorteableList(value.label);
            })
        }

})();
