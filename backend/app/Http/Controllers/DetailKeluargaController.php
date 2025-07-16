<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\ViewPenduduk;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\DetailKeluarga;
use Illuminate\Validation\Rule;
use App\Models\ViewDetailKeluarga;
use Illuminate\Validation\ValidationException;

class DetailKeluargaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $id = $request->input('id');
        $detailkeluarga = ViewDetailKeluarga::where('NOKK', $id)->where('nama', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat', $detailkeluarga);
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
                'NOKK' => 'required|exists:tb_keluarga,NOKK|integer',
                'NIK' => 'required|exists:tb_penduduk,NIK|unique:tb_detail_keluarga,NIK',
                'status_hubungan' => 'required',
                'nik_ayah' => 'nullable|exists:tb_penduduk,NIK',
                'nik_ibu' => 'nullable|exists:tb_penduduk,NIK',
            ], [
                'NOKK.required' => 'No KK wajib diisi.',
                'NOKK.exists' => 'No KK tidak valid.',
                'NOKK.integer' => 'No KK hanya berupa angka.',
                'status_hubungan.required' => 'Status Hubungan wajib diisi.',
                'NIK.required' => 'NIK wajib diisi.',
                'NIK.exists' => 'NIK tidak valid.',
                'NIK.unique' => 'NIK sudah terdaftar.',
                'nik_ayah.exists' => 'Ayah tidak valid.',
                'nik_ibu.exists' => 'Ibu tidak valid.',
            ]);
            $detailkeluarga = DetailKeluarga::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $detailkeluarga);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    public function alt()
    {
        $penduduk = ViewPenduduk::where('status', '!=', 'Lahir')->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat', $penduduk);
    }

    public function ayah()
    {
        $ayah = ViewPenduduk::where('jk', 'L')->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $ayah);
    }

    public function ibu()
    {
        $ibu = ViewPenduduk::where('jk', 'P')->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $ibu);
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailKeluarga $detail_keluarga)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $detail_keluarga);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetailKeluarga $detailKeluarga)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DetailKeluarga $detail_keluarga)
    {
        try {
            $validasi = $request->validate([
                'NOKK' => 'required|exists:tb_keluarga,NOKK|integer',
                'NIK' => [
                    'required',
                    'exists:tb_penduduk,NIK',
                    Rule::unique('tb_detail_keluarga', 'NIK')->ignore($detail_keluarga->NIK, 'NIK')
                ],
                'status_hubungan' => 'required',
                'nik_ayah' => 'nullable|exists:tb_penduduk,NIK',
                'nik_ibu' => 'nullable|exists:tb_penduduk,NIK',
            ], [
                'NOKK.required' => 'No KK wajib diisi.',
                'NOKK.exists' => 'No KK tidak valid.',
                'NOKK.integer' => 'No KK hanya berupa angka.',
                'status_hubungan.required' => 'Status Hubungan wajib diisi.',
                'NIK.required' => 'NIK wajib diisi.',
                'NIK.exists' => 'NIK tidak valid.',
                'NIK.unique' => 'NIK sudah terdaftar.',
                'nik_ayah.exists' => 'Ayah tidak valid.',
                'nik_ibu.exists' => 'Ibu tidak valid.',
            ]);
            $detail_keluarga->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $detail_keluarga);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailKeluarga $detail_keluarga)
    {
        $detail_keluarga->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
