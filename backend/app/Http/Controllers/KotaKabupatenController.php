<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use Illuminate\Http\Request;
use App\Models\KotaKabupaten;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class KotaKabupatenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $kota_kabupaten = KotaKabupaten::select('id_kota_kabupaten', 'id_provinsi', DB::raw("CONCAT(jenis, ' ', nama) AS kota_kabupaten"))->with('provinsi')->where(DB::raw("CONCAT(jenis, ' ', nama)"), 'like', "%$search%")->get()->makeHidden(['id_provinsi']);
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kota_kabupaten);
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
                'jenis' => 'required',
                'id_provinsi' => 'required|exists:tb_provinsi,id_provinsi'
            ], [
                'nama.required' => 'Nama wajib diisi.',
                'jenis.required' => 'Jenis wajib diisi.',
                'id_provinsi.required' => 'Provinsi wajib diisi.',
                'id_provinsi.exists' => 'Provinsi tidak valid.',
            ]);
            $kota_kabupaten = KotaKabupaten::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $kota_kabupaten);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(KotaKabupaten $kota_kabupaten)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kota_kabupaten);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KotaKabupaten $kota_kabupaten)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KotaKabupaten $kota_kabupaten)
    {
        try {
            $validasi = $request->validate([
                'nama' => 'required',
                'jenis' => 'required',
                'id_provinsi' => 'required|exists:tb_provinsi,id_provinsi'
            ], [
                'nama.required' => 'Nama wajib diisi.',
                'jenis.required' => 'Jenis wajib diisi.',
                'id_provinsi.required' => 'Provinsi wajib diisi.',
                'id_provinsi.exists' => 'Provinsi tidak valid.',
            ]);
            $kota_kabupaten->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diedit.', $kota_kabupaten);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KotaKabupaten $kota_kabupaten)
    {
        $kota_kabupaten->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
