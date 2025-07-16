<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DesaKelurahanController;
use App\Http\Controllers\DetailKeluargaController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KecamatanController;
use App\Http\Controllers\KelahiranController;
use App\Http\Controllers\KeluargaController;
use App\Http\Controllers\KematianController;
use App\Http\Controllers\KotaKabupatenController;
use App\Http\Controllers\PekerjaanController;
use App\Http\Controllers\PendatangController;
use App\Http\Controllers\PendidikanController;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\PindahController;
use App\Http\Controllers\ProvinsiController;
use App\Http\Controllers\RTController;
use App\Http\Controllers\RWController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/updateprofile', [AuthController::class, 'updateProfile']);
    Route::post('/updateavatar', [AuthController::class, 'updateAvatar']);
});
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::get('/avatar/{id}', [AuthController::class, 'avatar']);
Route::get('/home', HomeController::class);

Route::resource('provinsi', ProvinsiController::class);
Route::resource('kota-kabupaten', KotaKabupatenController::class);
Route::resource('kecamatan', KecamatanController::class);
Route::resource('desa-kelurahan', DesaKelurahanController::class);
Route::resource('rw', RWController::class);
Route::resource('rt', RTController::class);
Route::resource('pendidikan', PendidikanController::class);
Route::resource('pekerjaan', PekerjaanController::class);
Route::resource('penduduk', PendudukController::class);
Route::get('/penduduk/alt/{penduduk}', [PendudukController::class, 'alt']);
Route::resource('keluarga', KeluargaController::class);
Route::get('detail-keluarga/alt', [DetailKeluargaController::class, 'alt']);
Route::resource('detail-keluarga', DetailKeluargaController::class);
Route::get('ayah', [DetailKeluargaController::class, 'ayah']);
Route::get('ibu', [DetailKeluargaController::class, 'ibu']);
Route::get('kematian/alt', [KematianController::class, 'alt']);
Route::resource('kematian', KematianController::class);
Route::resource('kelahiran', KelahiranController::class);
Route::get('pindah/alt', [PindahController::class, 'alt']);
Route::resource('pindah', PindahController::class);
Route::resource('pendatang', PendatangController::class);
Route::get('petugas', [PetugasController::class, 'index']);
Route::post('petugas', [PetugasController::class, 'store']);
Route::get('petugas/{id}', [PetugasController::class, 'show']);
Route::put('petugas/{petugas:id_petugas}', [PetugasController::class, 'update']);
Route::delete('petugas/{petugas:id_petugas}', [PetugasController::class, 'destroy']);

