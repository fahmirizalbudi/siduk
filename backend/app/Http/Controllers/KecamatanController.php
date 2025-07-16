<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Kecamatan;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class KecamatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $kecamatan = Kecamatan::select('id_kecamatan', 'nama_kecamatan', 'id_kota_kabupaten')->with(['kotakabupaten' => function ($query) {
            $query->selectRaw("id_kota_kabupaten, CONCAT(jenis, ' ', nama) AS kota_kabupaten, id_provinsi")->with('provinsi');
        }])->where('nama_kecamatan', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kecamatan);
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
                'nama_kecamatan' => 'required',
                'id_kota_kabupaten' => 'required|exists:tb_kota_kabupaten,id_kota_kabupaten'
            ], [
                'nama_kecamatan.required' => 'Nama Kecamatan wajib diisi.',
                'id_kota_kabupaten.required' => 'Kota & Kabupaten wajib diisi.',
                'id_kota_kabupaten.exists' => 'Kota & Kabupaten tidak valid.',
            ]);
            $kecamatan = Kecamatan::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $kecamatan);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kecamatan $kecamatan)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kecamatan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kecamatan $kecamatan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kecamatan $kecamatan)
    {
        try {
            $validasi = $request->validate([
                'nama_kecamatan' => 'required',
                'id_kota_kabupaten' => 'required|exists:tb_kota_kabupaten,id_kota_kabupaten'
            ], [
                'nama_kecamatan.required' => 'Nama Kecamatan wajib diisi.',
                'id_kota_kabupaten.required' => 'Kota & Kabupaten wajib diisi.',
                'id_kota_kabupaten.exists' => 'Kota & Kabupaten tidak valid.',
            ]);
            $kecamatan->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diedit.', $kecamatan);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kecamatan $kecamatan)
    {
        $kecamatan->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
