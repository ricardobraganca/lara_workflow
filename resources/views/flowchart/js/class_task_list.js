class task_list {

    constructor(op){
        this.flowchart = op.get_flowchart();
        this.container = op.get_flowchart_container();
    }

    set_elements_draggable($draggableOperators){

        var $this = this;

        $draggableOperators.draggable({
            cursor: "move",
            opacity: 0.7,
            // helper: 'clone',
            appendTo: 'body',
            zIndex: 1000,
            helper: function(e) {
                var data = $this.getOperatorData(this);
                return $this.flowchart.flowchart('getOperatorElement', data);
            },
            stop: function(e, ui) {

                var $container = $this.container;
                //var $this = $(this);
                var elOffset = ui.offset;
                var containerOffset = $container.offset();
                if (elOffset.left > containerOffset.left &&
                    elOffset.top > containerOffset.top &&
                    elOffset.left < containerOffset.left + $container.width() &&
                    elOffset.top < containerOffset.top + $container.height()) {
                    var flowchartOffset = $this.flowchart.offset();
                    var relativeLeft = elOffset.left - flowchartOffset.left;
                    var relativeTop = elOffset.top - flowchartOffset.top;
                    var positionRatio = $this.flowchart.flowchart('getPositionRatio');
                    relativeLeft /= positionRatio;
                    relativeTop /= positionRatio;
                    var data = $this.getOperatorData(this);
                    data.left = relativeLeft;
                    data.top = relativeTop;
                    $this.flowchart.flowchart('addOperator', data);
                    //$flowchart.flowchart('createOperator', nbId, data);
                }
            }
        });
    }

    getOperatorData($element) {

        var nbId = parseInt($element.getAttribute('data-nb-id'), 10);
        var nbTitle = $element.getAttribute('data-nb-title');
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

    add_dragable_task($ul_drag, id_operator, title){

        let $this = this;
       // $div_header = document.createElement('div');
        let $div_body = document.createElement('div');
        let $btn_del = document.createElement('button');
        let $element_drag = document.createElement('li');


        $btn_del.innerHTML='X';
        $btn_del.classList.add('w3-button');
        $btn_del.classList.add('w3-tiny');
        $btn_del.classList.add('w3-left');

        $btn_del.addEventListener('click', function(evt){

            evt.preventDefault();
            var $obj_parent = this.parentNode;
            let $elements_title = $('.flowchart-operator-title');
            let titulo_tarefa = $obj_parent.getAttribute('data-nb-title');

            if($this.operator_in_stage($elements_title, titulo_tarefa) ){
                $.alert("Tarefa <b>'" + titulo_tarefa + "'</b> em uso no fluxograma. Remova todas as ocorrências antes de excluir.");
                return false;
            }

            $.confirm({
                title: 'Atenção',
                content: "Tem certeza que deseja excluir a tarefa <b>'" + titulo_tarefa +"'</b> ?",
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
        $ul_drag[0].appendChild($element_drag);
        //this.set_elements_draggable();
    }

    operator_in_stage(operators, title){

        for(let i=0; i<operators.length; i++ ){
            if(title == operators[i].innerText){
                return true;
            }
        }
        return false;
    }

}
