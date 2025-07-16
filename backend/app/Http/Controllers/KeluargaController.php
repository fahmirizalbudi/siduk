<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Keluarga;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class KeluargaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $keluarga = Keluarga::select()->with('rt', 'rw')->with(['desakelurahan' => function ($query) {
            $query->selectRaw("kode_pos, CONCAT(jenis, ' ', nama)as desa_kelurahan");
        }])->where('NOKK', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat', $keluarga);
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
                'NOKK' => 'required|unique:tb_keluarga,NOKK|integer',
                'alamat' => 'required',
                'id_rt' => 'required|exists:tb_rt,id_rt',
                'id_rw' => 'required|exists:tb_rw,id_rw',
                'kode_pos' => 'required|exists:tb_desa_kelurahan,kode_pos',
            ], [
                'NOKK.required' => 'No KK wajib diisi.',
                'NOKK.unique' => 'No KK sudah terdaftar.',
                'NOKK.integer' => 'No KK hanya berupa angka.',
                'alamat.required' => 'Alamat wajib diisi.',
                'id_rt.required' => 'Rt wajib diisi.',
                'id_rt.exists' => 'Rt tidak valid.',
                'id_rw.required' => 'Rw wajib diisi.',
                'id_rw.exists' => 'Rw tidak valid.',
                'kode_pos.required' => 'Kode Pos wajib diisi.',
                'kode_pos.exists' => 'Kode Pos tidak valid.',
            ]);
            $keluarga = Keluarga::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $keluarga);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Keluarga $keluarga)
    {
        return Api::make(Response::HTTP_OK, 'Data berasil dimuat.', $keluarga);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Keluarga $keluarga)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Keluarga $keluarga)
    {
        try {
            $validasi = $request->validate([
                'NOKK' => [
                    'required',
                    'integer',
                    Rule::unique('tb_keluarga', 'NOKK')->ignore($keluarga->NOKK, 'NOKK')
                ],
                'alamat' => 'required',
                'id_rt' => 'required|exists:tb_rt,id_rt',
                'id_rw' => 'required|exists:tb_rw,id_rw',
                'kode_pos' => 'required|exists:tb_desa_kelurahan,kode_pos',
            ], [
                'NOKK.required' => 'No KK wajib diisi.',
                'NOKK.unique' => 'No KK sudah terdaftar.',
                'NOKK.integer' => 'No KK hanya berupa angka.',
                'alamat.required' => 'Alamat wajib diisi.',
                'id_rt.required' => 'Rt wajib diisi.',
                'id_rt.exists' => 'Rt tidak valid.',
                'id_rw.required' => 'Rw wajib diisi.',
                'id_rw.exists' => 'Rw tidak valid.',
                'kode_pos.required' => 'Kode Pos wajib diisi.',
                'kode_pos.exists' => 'Kode Pos tidak valid.',
            ]);
            $keluarga->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $keluarga);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Keluarga $keluarga)
    {
        $keluarga->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus', null);
    }
}
