<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\ViewWilayah;
use Illuminate\Http\Request;
use App\Models\DesaKelurahan;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class DesaKelurahanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $desakelurahan = ViewWilayah::where('desa_kelurahan', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $desakelurahan);
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
                'kode_pos' => 'required|unique:tb_desa_kelurahan,kode_pos|integer',
                'nama' => 'required',
                'jenis' => 'required',
                'id_kecamatan' => 'required|exists:tb_kecamatan,id_kecamatan'
            ], [
                'kode_pos.required' => 'Kode Pos wajib diisi.',
                'kode_pos.unique' => 'Kode Pos sudah terdaftar.',
                'kode_pos.integer' => 'Kode Pos hanya berupa angka.',
                'nama.required' => 'Nama wajib diisi.',
                'jenis.required' => 'Jenis wajib diisi.',
                'id_kecamatan.required' => 'Kecamatan wajib diisi.',
                'id_kecamatan.exists' => 'Kecamatan tidak valid.',
            ]);
            $desakelurahan = DesaKelurahan::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $desakelurahan);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(DesaKelurahan $desa_kelurahan)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $desa_kelurahan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DesaKelurahan $desa_kelurahan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DesaKelurahan $desa_kelurahan)
    {
        try {
            $validasi = $request->validate([
                'kode_pos' => [
                    'required',
                    'integer',
                    Rule::unique('tb_desa_kelurahan', 'kode_pos')->ignore($desa_kelurahan->kode_pos, 'kode_pos')
                ],
                'nama' => 'required',
                'jenis' => 'required',
                'id_kecamatan' => 'required|exists:tb_kecamatan,id_kecamatan'
            ], [
                'kode_pos.required' => 'Kode Pos wajib diisi.',
                'kode_pos.unique' => 'Kode Pos sudah terdaftar.',
                'kode_pos.integer' => 'Kode Pos hanya berupa angka.',
                'nama.required' => 'Nama wajib diisi.',
                'jenis.required' => 'Jenis wajib diisi.',
                'id_kecamatan.required' => 'Kecamatan wajib diisi.',
                'id_kecamatan.exists' => 'Kecamatan tidak valid.',
            ]);
            $desa_kelurahan->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $desa_kelurahan);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DesaKelurahan $desa_kelurahan)
    {
        $desa_kelurahan->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
