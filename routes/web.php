<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [NewsController::class, 'index'])->name('news.index');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/news', [NewsController::class, 'show'])->name('news.show');
    Route::post('/news', [NewsController::class, 'store'])->name('news.store');
    Route::get('/news/edit', [NewsController::class, 'edit'])->name('news.edit');
    Route::patch('/news', [NewsController::class, 'update'])->name('news.update');
    Route::delete('/news', [NewsController::class, 'destroy'])->name('news.destroy');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
