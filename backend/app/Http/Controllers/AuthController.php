<?php

namespace App\Http\Controllers;

use App\Helpers\Api;
use App\Models\Petugas;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required',
                'password' => 'required',
            ], [
                'username.required' => 'Username wajib diisi.',
                'password.required' => 'Password wajib diisi.',
            ]);

            $petugas = Petugas::whereRaw('BINARY username = ?', [$request->username])->first();

            if (!$petugas || !Hash::check($request->password, $petugas->password)) {
                return response()->json(['message' => 'Username atau Password salah.'], 401);
            }

            $token = $petugas->createToken('auth_token')->plainTextToken;

            return response()->json([
                // 'status' => 'success',
                'access_token' => $token,
                'token_type' => 'Bearer',
                // 'nama' => $petugas->nama_petugas,
                // 'user' => $petugas->username
            ]);
        } catch (ValidationException $e) {
            return Api::make(422, 'Username atau Password salah.', null);
        }
    }

    public function profile(Request $request)
    {
        return response()->json(collect($request->user())->except('image'));
    }

    public function avatar($id)
    {
        $image = Petugas::findOrFail($id);
        if ($image->image == null) {
            return Api::make(404, 'Avatar not found.', null);
        }

        return response($image->image)
            ->header('Content-Type', 'image/jpeg');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function updateProfile(Request $request)
    {
        try {
            $petugas = $request->user();
            $request->validate([
                'nama_petugas' => 'required',
                'username' => [
                    'required',
                    Rule::unique('tb_petugas', 'username')->ignore($petugas->username, 'username')
                ],
                'old_password' => 'nullable',
                'new_password' => 'nullable'
            ]);
            $data = [
                'nama_petugas' => $request->nama_petugas,
                'username' => $request->username,
            ];
            if ($request->filled('old_password') || $request->filled('new_password')) {
                if (!$request->filled('old_password') || !$request->filled('new_password')) {
                    return Api::make(422, 'Old Password dan New Password wajib diisi.', null);
                }

                if (!Hash::check($request->old_password, $petugas->password)) {
                    return Api::make(422, 'Old Password tidak cocok.', null);
                }

                $data['password'] = Hash::make($request->new_password);
            }

            $petugas->update($data);
            return Api::make(200, 'Data berhasil diubah.', $petugas);
        } catch (\Exception $e) {
            return Api::make(500, 'Terjadi kesalahan.', $e->getMessage());
        }
    }

    public function updateAvatar(Request $request)
    {
        try {
            $petugas = $request->user();
            $request->validate([
                'image' => 'required'
            ]);
            $imageData = file_get_contents($request->file('image')->getRealPath());
            $petugas->update(['image' => $imageData]);
            return Api::make(200, 'Avatar berhasil diubah.', null);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation Failed', null);
        }
    }
}
