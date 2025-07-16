<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Penduduk;
use App\Models\Pendatang;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class PendatangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $pendatang = Pendatang::with([
            'penduduk' => function ($query) {
                $query->selectRaw("NIK, nama");
            }
        ])->whereHas('penduduk', function ($query) use ($search) {
            $query->where('nama', 'like', "%$search%");
        })->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pendatang);
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
            $request->validate([
                'NIK' => [
                    'required',
                    'integer',
                    'unique:tb_pendatang,NIK',
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
                'tanggal_datang' => 'required',
                'alasan' => 'required',
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
                'tanggal_datang.required' => 'Tanggal Datang wajib diisi.',
                'alasan.required' => 'Alasan wajib diisi.',
            ]);
            $pendatang = Pendatang::storeProcedure($request->NIK, $request->nama, $request->tempat_lahir, $request->tanggal_lahir, $request->jk, $request->alamat, $request->agama, $request->id_pendidikan, $request->id_pekerjaan, $request->kewarganegaraan, $request->golongan_darah, $request->tanggal_datang, $request->alasan);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $pendatang);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pendatang $pendatang)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $pendatang->with('penduduk')->where('id_pendatang', $pendatang->id_pendatang)->first());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pendatang $pendatang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pendatang $pendatang)
    {
        try {
            $request->validate([
                'NIK' => [
                    'required',
                    'integer',
                    Rule::unique('tb_pendatang', 'NIK')->ignore($pendatang->NIK, 'NIK')
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
                'tanggal_datang' => 'required',
                'alasan' => 'required',
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
                'tanggal_datang.required' => 'Tanggal Datang wajib diisi.',
                'alasan.required' => 'Alasan wajib diisi.',
            ]);
            $pendatang = Pendatang::updateProcedure($pendatang->NIK, $request->NIK, $request->nama, $request->tempat_lahir, $request->tanggal_lahir, $request->jk, $request->alamat, $request->agama, $request->id_pendidikan, $request->id_pekerjaan, $request->kewarganegaraan, $request->golongan_darah, $request->tanggal_datang, $request->alasan);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $pendatang);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pendatang $pendatang)
    {
        $nik = $pendatang->NIK;
        $pendatang->delete();
        Penduduk::find($nik)->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
