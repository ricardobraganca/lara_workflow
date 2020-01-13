const mix = require('laravel-mix');


mix.
styles(
    [
        'resources/css/w3.css',
        'resources/css/jquery-ui.css',
        'resources/css/jquery.flowchart.css',
        'resources/css/sorteable.css'
    ],
    'public/css/styles.css'
    ).
styles([
    'resources/views/flowchart/css/main_flowchart.css'
    ],
    'public/css/main_flowchart.css').
scripts(
    [
        'resources/js/jquery.js',
        'resources/js/jquery-ui.js',
        'resources/js/jquery.sortable.js',
        'resources/views/flowchart/js/class_operator.js',
        'resources/views/flowchart/js/class_task_list.js',
        'resources/views/flowchart/js/class_tab.js',
        'resources/views/flowchart/js/class_config_op.js'
    ],
    'public/js/scripts.js').
scripts(
    [
        'resources/views/flowchart/js/jquery.flowchart.js',
        'resources/views/flowchart/js/main_flowchart.js'
    ],
    'public/js/main_flowchart.js');
