@extends('layouts.principal', ['title'=>'Fluxograma'])

@section('load_css')
    <link rel="stylesheet" href="{{ asset('css/main_flowchart.css') }}">
@endsection

@section('content')

    <div class="w3-sidebar w3-light-grey w3-card w3-margin w3-padding" style="width:20%;">

        <button class="w3-button w3-block w3-green w3-margin-bottom" id="btn_salvar_projeto">Salvar Projeto</button>
            <section id="section_tab" class="w3-block">
                <div id="tab_menu" class="w3-bar w3-blue w3-inline">
                <button class="w3-bar-item w3-button tablink">Tarefas</button>
                <button class="w3-bar-item w3-button tablink">Config</button>
                <button class="w3-bar-item w3-button tablink">Proc</button>
                </div>
                <div id="Tarefas" class="w3-container w3-border menuid">
                    @include('flowchart.task_tarefas')
                </div>

                <div id="Config" class="w3-container w3-border menuid" style="display:none">
                    @include('flowchart.task_config')
                </div>

                <div id="Proc" class="w3-container w3-border menuid" style="display:none">
                    @include('flowchart.task_proc')
                </div>
            </section>
    </div>

    <div style="margin-left:21%">
        <div class="w3-container">
            <div  id="stage" oncontextmenu="javascript:alert('success!');return false;"></div>
        </div>
    </div>

@endsection

@section('load_js')
    <script src="{{ asset('js/main_flowchart.js') }}"></script>
@endsection
