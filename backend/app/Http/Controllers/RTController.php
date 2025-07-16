<?php

namespace App\Http\Controllers;

use App\Models\RT;
use App\Helpers\Api;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class RTController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $rt = RT::where('rt', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $rt);
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
                'rt' => 'required',
            ], [
                'rt.required' => 'Rt wajib diisi.',
            ]);
            $rt = RT::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $rt);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(RT $rt)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $rt);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RT $rT)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RT $rt)
    {
        try {
            $validasi = $request->validate([
                'rt' => 'required',
            ], [
                'rt.required' => 'Rt wajib diisi.',
            ]);
            $rt->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $rt);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RT $rt)
    {
        $rt->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
