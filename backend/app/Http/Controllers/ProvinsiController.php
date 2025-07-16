<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Provinsi;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class ProvinsiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', Provinsi::where('nama_provinsi', 'like', "%$search%")->get());
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
                'nama_provinsi' => 'required',
            ], [
                'nama_provinsi.required' => 'Nama provinsi wajib diisi.'
            ]);
            $provinsi = Provinsi::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $provinsi);
        }
        catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Provinsi $provinsi)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $provinsi);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Provinsi $provinsi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Provinsi $provinsi)
    {
        try {
            $validasi = $request->validate([
                'nama_provinsi' => 'required',
            ], [
                'nama_provinsi.required' => 'Nama provinsi wajib diisi.'
            ]);
            $provinsi->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $provinsi);
        }
        catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Provinsi $provinsi)
    {
        $provinsi->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
