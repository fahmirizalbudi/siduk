<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Pindah;
use App\Models\ViewPenduduk;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class PindahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $pindah = Pindah::with(['viewpenduduk' => function ($query) {
            $query->selectRaw("status, NIK, nama")->where('status', '=', 'Pindah');
        }])->whereHas('viewpenduduk', function ($query) use ($search) {
            $query->where('nama', 'like', "%$search%");
        })->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pindah);
    }

    public function alt() {
        $pindah = ViewPenduduk::select('NIK', 'status', 'nama')->with('pindah')->where('status', '=', 'Pindah')->orWhere('status', '=', 'Hidup')->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pindah);
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
                'NIK' => 'required|unique:tb_pindah,NIK|exists:tb_penduduk,NIK',
                'tanggal_pindah' => 'required|date',
                'alasan' => 'required'
            ], [
                'NIK.required' => 'Penduduk wajib diisi.',
                'NIK.unique' => 'Penduduk telah terdaftar sebagai pindah',
                'NIK.exists' => 'Penduduk tidak valid',
                'tanggal_pindah.required' => 'Tanggal Pindah wajib diisi.',
                'tanggal_pindah.date' => 'Tanggal Pindah harus berformat tanggal.',
                'alasan.required' => 'Alasan wajib diisi.',
            ]);
            $pindah = Pindah::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $pindah);
        } catch (ValidationException $e) {
            return Api::make(Response::HTTP_UNPROCESSABLE_ENTITY, 'Validation Failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pindah $pindah)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pindah);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pindah $pindah)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pindah $pindah)
    {
        try {
            $validasi = $request->validate([
                'NIK' => [
                    'required',
                    'exists:tb_penduduk,NIK',
                    Rule::unique('tb_pindah', 'NIK')->ignore($pindah->NIK, 'NIK')
                ],
                'tanggal_pindah' => 'required|date',
                'alasan' => 'required'
            ], [
                'NIK.required' => 'Penduduk wajib diisi.',
                'NIK.unique' => 'Penduduk telah terdaftar sebagai pindah',
                'NIK.exists' => 'Penduduk tidak valid',
                'tanggal_pindah.required' => 'Tanggal Pindah wajib diisi.',
                'tanggal_pindah.date' => 'Tanggal Pindah harus berformat tanggal.',
                'alasan.required' => 'Alasan wajib diisi.',
            ]);
            $pindah->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $pindah);
        } catch (ValidationException $e) {
            return Api::make(Response::HTTP_UNPROCESSABLE_ENTITY, 'Validation Failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pindah $pindah)
    {
        $pindah->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
