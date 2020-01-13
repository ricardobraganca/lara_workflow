<?php

namespace App\Http\Controllers;

use App\Flowchart;
use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;

class FlowchartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('flowchart.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('flowchart.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Flowchart  $flowchart
     * @return \Illuminate\Http\Response
     */
    public function show(Flowchart $flowchart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Flowchart  $flowchart
     * @return \Illuminate\Http\Response
     */
    public function edit(Flowchart $flowchart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Flowchart  $flowchart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Flowchart $flowchart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Flowchart  $flowchart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Flowchart $flowchart)
    {
        //
    }
}
