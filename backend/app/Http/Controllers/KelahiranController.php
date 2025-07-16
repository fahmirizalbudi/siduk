<?php

namespace App\Http\Controllers;

use App\Models\Kelahiran;
use App\Models\ViewKelahiran;
use Illuminate\Http\Request;
use App\Helpers\Api;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class KelahiranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $kelahiran = ViewKelahiran::where('nama', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kelahiran);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validasi = $request->validate([
                'nama' => 'required',
                'tanggal_lahir' => 'required|date',
                'tempat' => 'required',
                'nik_ayah' => 'required|exists:tb_penduduk,NIK',
                'nik_ibu' => 'required|exists:tb_penduduk,NIK',
            ], [
                'nama.required' => 'Nama wajib diisi',
                'tanggal_lahir.required' => 'Tanggal Lahir wajib diisi',
                'tanggal_lahir.date' => 'Tanggal Lahir harus berformat tanggal.',
                'tempat.required' => 'Tempat wajib diisi',
                'nik_ayah.required' => 'Ayah wajib diisi',
                'nik_ayah.exists' => 'Data Ayah tidak valid',
                'nik_ibu.exists' => 'Data Ibu tidak valid',
                'nik_ibu.required' => 'Ibu wajib diisi',
            ]);
            $kelahiran = Kelahiran::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $kelahiran);
        } catch (ValidationException $e) {
            return Api::make(Response::HTTP_UNPROCESSABLE_ENTITY, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kelahiran $kelahiran)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kelahiran);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kelahiran $kelahiran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kelahiran $kelahiran)
    {
        try {
            $validasi = $request->validate([
                'nama' => 'required',
                'tanggal_lahir' => 'required|date',
                'tempat' => 'required',
                'nik_ayah' => 'required|exists:tb_penduduk,NIK',
                'nik_ibu' => 'required|exists:tb_penduduk,NIK',
            ], [
                'nama.required' => 'Nama wajib diisi',
                'tanggal_lahir.required' => 'Tanggal Lahir wajib diisi',
                'tanggal_lahir.date' => 'Tanggal Lahir harus berformat tanggal.',
                'nik_ayah.required' => 'Ayah wajib diisi',
                'nik_ayah.exists' => 'Data Ayah tidak valid',
                'nik_ibu.exists' => 'Data Ibu tidak valid',
                'nik_ibu.required' => 'Ibu wajib diisi',
            ]);
            $kelahiran->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $kelahiran);
        } catch (ValidationException $e) {
            return Api::make(Response::HTTP_UNPROCESSABLE_ENTITY, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelahiran $kelahiran)
    {
        $kelahiran->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
