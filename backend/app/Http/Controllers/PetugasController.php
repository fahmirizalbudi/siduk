<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Petugas;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class PetugasController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $petugas = Petugas::select('id_petugas', 'nama_petugas', 'username')->where('username', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $petugas);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama_petugas' => 'required',
                'username' => 'required|unique:tb_petugas,username',
                'password' => 'required'
            ]);
            $petugas = Petugas::create([
                'nama_petugas' => $request->nama_petugas,
                'username' => $request->username,
                'password' => Hash::make($request->password)
            ]);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $petugas);
        } catch (ValidationException $e) {
            return Api::make(Response::HTTP_OK, 'Validation Failed', $e->errors());
        }
    }

    public function show($id)
    {
        $petugas = Petugas::find($id);
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $petugas);
    }

    public function update(Request $request, Petugas $petugas)
    {
        try {
            $request->validate([
                'nama_petugas' => 'required',
                'username' => [
                    'required',
                    Rule::unique('tb_petugas', 'username')->ignore($petugas->username, 'username')
                ],
                'password' => 'nullable'
            ]);
            $data = [
                'nama_petugas' => $request->nama_petugas,
                'username' => $request->username,
            ];
            if ($request->filled('password')) {
                $data['password'] = Hash::make($request->password);
            }
            $petugas->update($data);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $petugas);
        } catch (ValidationException $e) {
            return Api::make(Response::HTTP_OK, 'Validation Failed', $e->errors());
        }
    }

    public function destroy(Petugas $petugas)
    {
        $petugas->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
