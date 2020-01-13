<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            "descricao"=>"unique:tasks|required"
        ]);

        $task = new Task();
        $task->qtd_dias = 0;
        $task->qtd_horas = 0;
        $task->descricao = $request->descricao;

        if($task->save()){
            return json_encode($task);
        }else{
            $resposta['success'] = false;
            $resposta['message'] = 'Falha ao tentar salvar.';
            return json_encode($resposta);
        };
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $message = array();

        if($task->delete()){

            $message['status'] = 'true';
            $message['msg'] = 'Excluído com sucesso.';
            return response()->json($message);
        }else{

            $message['status'] = 'false';
            $message['msg'] = 'Falha ao tentar excluír.';
            return response()->json($message);
        }

    }
}
