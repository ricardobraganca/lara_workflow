<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">


    <title>{{ $title }}</title>
</head>
<body>

    <div class="w3-bar w3-black">
        <a href="#" class="w3-bar-item w3-button w3-mobile w3-gray">Workflow home</a>
        <a href="#" class="w3-bar-item w3-button w3-mobile">Lobby</a>
        <div class="w3-dropdown-hover w3-mobile">
            <button class="w3-button">Administração <i class="fa fa-caret-down"></i></button>
            <div class="w3-dropdown-content w3-bar-block w3-dark-grey" style="z-index:5">
            <a href="#" class="w3-bar-item w3-button w3-mobile">Usuários</a>
            <a href="#" class="w3-bar-item w3-button w3-mobile">Tarefas</a>
            <a href="#" class="w3-bar-item w3-button w3-mobile">Grupos</a>
            <a href="#" class="w3-bar-item w3-button w3-mobile">Fluxogramas</a>
            @yield('load_css')
            </div>
        </div>
    </div>

    @yield('content')
    <script src="{{ asset('js/scripts.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
</body>
    @yield('load_js')
</html>
