<div class="w3-bar">

    <div class="w3-bar w3-margin-right w3-margin-top">
        <form id="form_tarefas"  class="w3-margin-top" action="{{ route('task.store') }}" method="POST">
            @csrf
            <input type="hidden" id="url_route" value="{{ route('task.store') }}">
            <label for="name_op" >Nome da Tarefa</label>
            <input class="w3-input w3-border w3-margin-bottom" name="descricao" type="text" id="descricao">
            <div class="w3-bar">
                <button id="btn_deletar" class="w3-bar-item w3-button w3-red w3-ripple btn-task-crud">-</button>
                <button id="btn_novo" class="w3-bar-item w3-button w3-green w3-ripple btn-task-crud">+</button>
            </div>
            <div>
                <ul class="draggable_operators_ul">
                  <!--  <li class="draggable_operator w3-card" data-nb-title="titulo" data-nb-id="111" data-nb-inputs="1" data-nb-outputs="1">1 input &amp; 1 output</li> -->
                </ul>
            </div>
        </form>
    </div>
</div>

