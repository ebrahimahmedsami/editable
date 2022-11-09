<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/users', function (Request $request) {
    $users = \App\Models\User::all();
    $host = $request->getHost();
    return response()->json(['data'=>['users'=>$users,'host'=>$host]],200);
});
Route::post('/update/user/{id}', function (Request $request) {
    $user = \App\Models\User::find($request->id);
    $user->update([
        'name' => $request->name,
        'age' => $request->age,
        'type' => $request->type,
        'status' => $request->status,
        'created_at' => $request->created_at
    ]);
    return response()->json(['data'=>'updated'],200);
});
