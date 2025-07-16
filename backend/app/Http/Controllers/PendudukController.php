<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Penduduk;
use App\Models\ViewPenduduk;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use  Illuminate\Validation\ValidationException;

class PendudukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $penduduk = ViewPenduduk::where('status', '=', 'Hidup')->where('nama', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat', $penduduk);
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
                'NIK' => 'required|unique:tb_penduduk,nik|integer',
                'nama' => 'required',
                'tempat_lahir' => 'required|exists:tb_kota_kabupaten,id_kota_kabupaten',
                'tanggal_lahir' => 'required|date',
                'jk' => 'required',
                'alamat' => 'required',
                'agama' => 'required',
                'id_pendidikan' => 'required|exists:tb_pendidikan,id_pendidikan',
                'id_pekerjaan' => 'required|exists:tb_pekerjaan,id_pekerjaan',
                'kewarganegaraan' => 'required',
                'golongan_darah' => 'required',
            ], [
                'NIK.required' => 'NIK wajib diisi.',
                'NIK.unique' => 'NIK sudah terdaftar.',
                'NIK.integer' => 'NIK hanya berupa angka.',
                'nama.required' => 'Nama wajib diisi.',
                'tempat_lahir.required' => 'Tempat Lahir wajib diisi.',
                'tanggal_lahir.required' => 'Tanngal Lahir wajib diisi.',
                'tempat_lahir.exists' => 'Tempat Lahir tidak valid.',
                'jk.required' => 'Gender wajib diisi.',
                'alamat.required' => 'Alamat wajib diisi.',
                'agama.required' => 'Agama wajib diisi.',
                'id_pendidikan.required' => 'Pendidikan wajib diisi.',
                'id_pendidikan.exists' => 'Pendidikan tidak valid.',
                'id_pekerjaan.required' => 'Pekerjaan wajib diisi.',
                'id_pekerjaan.exists' => 'Pekerjaan tidak valid.',
                'kewarganegaraan.required' => 'Kewarganegaraan wajib diisi.',
                'golongan_darah.required' => 'Golongan Darah wajib diisi.',
            ]);
            $penduduk = Penduduk::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $penduduk);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Penduduk $penduduk)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat', $penduduk);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penduduk $penduduk)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penduduk $penduduk)
    {
        try {
            $validasi = $request->validate([
                'NIK' => [
                    'required',
                    'integer',
                    Rule::unique('tb_penduduk', 'NIK')->ignore($penduduk->NIK, 'NIK')
                ],
                'nama' => 'required',
                'tempat_lahir' => 'required|exists:tb_kota_kabupaten,id_kota_kabupaten',
                'tanggal_lahir' => 'required|date',
                'jk' => 'required',
                'alamat' => 'required',
                'agama' => 'required',
                'id_pendidikan' => 'required|exists:tb_pendidikan,id_pendidikan',
                'id_pekerjaan' => 'required|exists:tb_pekerjaan,id_pekerjaan',
                'kewarganegaraan' => 'required',
                'golongan_darah' => 'required',
            ], [
                'NIK.required' => 'NIK wajib diisi.',
                'NIK.unique' => 'NIK sudah terdaftar.',
                'NIK.integer' => 'NIK hanya berupa angka.',
                'nama.required' => 'Nama wajib diisi.',
                'tempat_lahir.required' => 'Tempat Lahir wajib diisi.',
                'tanggal_lahir.required' => 'Tanngal Lahir wajib diisi.',
                'tempat_lahir.exists' => 'Tempat Lahir tidak valid.',
                'jk.required' => 'Gender wajib diisi.',
                'alamat.required' => 'Alamat wajib diisi.',
                'agama.required' => 'Agama wajib diisi.',
                'id_pendidikan.required' => 'Pendidikan wajib diisi.',
                'id_pendidikan.exists' => 'Pendidikan tidak valid.',
                'id_pekerjaan.required' => 'Pekerjaan wajib diisi.',
                'id_pekerjaan.exists' => 'Pekerjaan tidak valid.',
                'kewarganegaraan.required' => 'Kewarganegaraan wajib diisi.',
                'golongan_darah.required' => 'Golongan Darah wajib diisi.',
            ]);
            $penduduk->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $penduduk);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penduduk $penduduk)
    {
        $penduduk->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }

    public function alt(Penduduk $penduduk)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat', ViewPenduduk::where('NIK', '=', $penduduk->NIK)->first());
    }
}
