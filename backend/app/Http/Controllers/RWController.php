<?php

namespace App\Http\Controllers;

use App\Models\RW;
use App\Helpers\Api;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class RWController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $rw = RW::where('rw', 'like', "%$search%")->get();
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $rw);
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
                'rw' => 'required',
            ], [
                'rw.required' => 'Rw wajib diisi.',
            ]);
            $rw = RW::create($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil dibuat.', $rw);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(RW $rw)
    {
        return Api::make(Response::HTTP_OK, 'Data berhasil dimuat.', $rw);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RW $rW)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RW $rw)
    {
        try {
            $validasi = $request->validate([
                'rw' => 'required',
            ], [
                'rw.required' => 'Rw wajib diisi.',
            ]);
            $rw->update($validasi);
            return Api::make(Response::HTTP_OK, 'Data berhasil diubah.', $rw);
        } catch (ValidationException $e) {
            return Api::make(422, 'Validation failed', $e->errors());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RW $rw)
    {
        $rw->delete();
        return Api::make(Response::HTTP_OK, 'Data berhasil dihapus.', null);
    }
}
