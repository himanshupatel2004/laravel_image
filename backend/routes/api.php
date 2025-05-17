<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::post('/upload', [\App\Http\Controllers\ImageController::class, 'upload']);
// Route::get('/images', [\App\Http\Controllers\ImageController::class, 'index']);

Route::post('/upload', [ImageController::class, 'upload']);
Route::get('/images', [ImageController::class, 'index']);