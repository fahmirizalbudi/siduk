<?php

namespace App\Http\Controllers;

use App\Models\Pekerjaan;
use Illuminate\Http\Request;
use App\Helpers\Api;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;

class PekerjaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $pekerjaan = Pekerjaan::where('keterangan', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pekerjaan);
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
                'keterangan' => 'required'
            ], [
                'keterangan.required' => 'Keterangan wajib diisi.'
            ]);
            $pekerjaan = Pekerjaan::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $pekerjaan);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pekerjaan $pekerjaan)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pekerjaan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pekerjaan $pekerjaan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pekerjaan $pekerjaan)
    {
        try {
            $validasi = $request->validate([
                'keterangan' => 'required'
            ], [
                'keterangan.required' => 'Keterangan wajib diisi.'
            ]);
            $pekerjaan->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diedit.', $pekerjaan);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pekerjaan $pekerjaan)
    {
        $pekerjaan->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus', null);
    }
}
