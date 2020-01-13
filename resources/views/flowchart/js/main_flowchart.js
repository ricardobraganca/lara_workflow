//https://craftpip.github.io/jquery-confirm/
//https://github.com/sdrdis/jquery.flowchart

$(document).ready(function(){

    $stage = $('#stage');
    $drag_op = $('.draggable_operator');
    $ul_drag = $('.draggable_operators_ul');
    $title_ops = $('.flowchart-operator-title');

    //$form_tarefas = document.querySelector('#form_tarefas');
    $form_tarefas = $('#form_tarefas');
    $nome_tarefa = $('#descricao');
    $btn_novo = document.querySelector('#btn_novo');
    $btn_delete = document.querySelector('#btn_deletar');
    $section_tab = document.querySelector('#section_tab');

    $obj_tab = new tab($section_tab);

    let url_task = $('#url_route').val();

    load_task_list_ajax(url_task);

    let $op = new operator($stage);
    let $tl = new task_list($op);

    //Define que as tarefas possam ser arrastadas de uma lista para o palco
    $tl.set_elements_draggable($drag_op);

    $btn_novo.addEventListener('click', function(e){

        e.preventDefault();
        store_task_ajax(url_task, $form_tarefas);
    });

    $btn_delete.addEventListener("click",function(e){

        e.preventDefault();

        if($op.get_flowchart().flowchart('getSelectedOperatorId') != null || $op.get_flowchart().flowchart('getSelectedLinkId') != null){
            $.confirm({
                title: 'Atenção',
                content: 'Tem certeza que deseja excluír ?',
                columnClass: 'small',
                buttons: {
                    sim: function () {

                        $op.get_flowchart().flowchart('deleteSelected');
                        $.alert('Excluído com sucesso!!!');
                    },
                    não: function () {

                    }
                }
            });
        }
    });

    $stage.on('dblclick',function(e){

        if(e.target.classList.contains('flowchart-operator-title')){
            let id_op = $op.get_flowchart().flowchart('getSelectedOperatorId');
            let op_data = $op.get_flowchart().flowchart('getOperatorData', id_op);
            console.log(op_data);
        }
    });

    $nome_tarefa.on("keyup", function(){

        let draggables = document.querySelectorAll(".draggable_operator");

        draggables.forEach(function(item, index){
            let it = item.getAttribute('data-nb-title').toLowerCase();

            if( it.includes($nome_tarefa.val().toLowerCase()) ){
                item.style.display='block';
            }else{
                item.style.display='none';
            }

        });
    });

    function store_task_ajax(url_store, form_task){

        $.ajax({
            url: url_store,
            type: 'POST',
            data: form_task.serialize(),
            dataType: 'json',
            success: function(response){

                if(response.message){
                    alert('erros')
                }

                $tl.add_dragable_task($ul_drag, 2, $nome_tarefa.val());
                $drag_op = $('.draggable_operator');
                $tl.set_elements_draggable($drag_op);
            },
            error: function(response){
                $.alert('Tarefa já existe!!')
            }
        });
    }

    function load_task_list_ajax(url_task){

        $.ajax({
            url: url_task,
            type: 'GET',
            dataType: 'json',
            success: function(response){

                response.forEach(function(resp, index){
                    $tl.add_dragable_task($ul_drag, resp.id, resp.descricao);
                    $drag_op = $('.draggable_operator');
                    $tl.set_elements_draggable($drag_op);
                });

            }
        });

    }




});


