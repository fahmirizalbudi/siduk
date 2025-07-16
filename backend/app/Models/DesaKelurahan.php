<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesaKelurahan extends Model
{
    protected $table = 'tb_desa_kelurahan';
    protected $primaryKey = 'kode_pos';
    public $incrementing = false;
    protected $fillable = ['kode_pos', 'nama', 'jenis', 'id_kecamatan'];
    public $timestamps = false;

    public function kecamatan() {
        return $this->belongsTo(Kecamatan::class, 'id_kecamatan');
    }

    public function keluarga() {
        return $this->hasMany(Keluarga::class, 'kode_pos');
    }
}
