<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{
    protected $table = 'tb_kecamatan';
    protected $primaryKey = 'id_kecamatan';
    protected $fillable = ['nama_kecamatan', 'id_kota_kabupaten'];
    public $timestamps = false;

    public function kotakabupaten() {
        return $this->belongsTo(KotaKabupaten::class, 'id_kota_kabupaten');
    }

    public function desakelurahan() {
        return $this->hasMany(DesaKelurahan::class, 'id_kecamatan');
    }
}
