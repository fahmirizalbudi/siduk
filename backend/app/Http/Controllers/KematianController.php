<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Kematian;
use App\Models\Penduduk;
use App\Models\ViewPenduduk;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class KematianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $kematian = Kematian::with(['viewpenduduk' => function ($query) {
            $query->select('NIK', 'nama', 'agama', 'jk');
        }])->whereHas('viewpenduduk', function ($query) use ($search) {
            $query->where('nama', 'like', "%$search%");
        })->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kematian);
    }

    public function alt() {
        $kematian = ViewPenduduk::select('NIK', 'status', 'nama', 'jk', 'agama')->with('kematian')->where('status', '=', 'Mati')->orWhere('status', '=', 'Hidup')->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kematian);
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
                'NIK' => 'required|exists:tb_penduduk,NIK|unique:tb_kematian,NIK',
                'tanggal' => 'required|date',
                'alasan' => 'required'
            ], [
                'NIK.required' => 'Penduduk wajib diisi.',
                'NIK.exists' => 'Penduduk tidak valid.',
                'NIK.unique' => 'Penduduk sudah terdaftar sebagai meninggal.',
                'tanggal.required' => 'Tanggal wajib diisi.',
                'alasan.required' => 'Alasan wajib diisi.',
            ]);
            $kematian = Kematian::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $kematian);
        } catch (ValidationException $e) {
            return Api::make(Response::HTTP_UNPROCESSABLE_ENTITY, 'Validation vailed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kematian $kematian)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $kematian);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kematian $kematian)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kematian $kematian)
    {
        try {
            $validasi = $request->validate([
                'NIK' => [
                    'required',
                    'exists:tb_penduduk,NIK',
                    Rule::unique('tb_kematian', 'NIK')->ignore($kematian->NIK, 'NIK')
                ],
                'tanggal' => 'required|date',
                'alasan' => 'required'
            ], [
                'NIK.required' => 'Penduduk wajib diisi.',
                'NIK.exists' => 'Penduduk tidak valid.',
                'NIK.unique' => 'Penduduk sudah terdaftar sebagai meninggal.',
                'tanggal.required' => 'Tanggal wajib diisi.',
                'alasan.required' => 'Alasan wajib diisi.',
            ]);
            $kematian->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $kematian);
        } catch (ValidationException $e) {
            return Api::make(Response::HTTP_UNPROCESSABLE_ENTITY, 'Validation vailed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kematian $kematian)
    {
        $kematian->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
