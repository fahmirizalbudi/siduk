<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Pendidikan;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;

class PendidikanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $pendidikan = Pendidikan::where('keterangan', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pendidikan);
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
            $pendidikan = Pendidikan::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $pendidikan);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pendidikan $pendidikan)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pendidikan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pendidikan $pendidikan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pendidikan $pendidikan)
    {
        try {
            $validasi = $request->validate([
                'keterangan' => 'required'
            ], [
                'keterangan.required' => 'Keterangan wajib diisi.'
            ]);
            $pendidikan->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $pendidikan);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pendidikan $pendidikan)
    {
        $pendidikan->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', $pendidikan);
    }
}
