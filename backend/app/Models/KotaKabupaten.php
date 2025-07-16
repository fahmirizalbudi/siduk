<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KotaKabupaten extends Model
{
    protected $table = 'tb_kota_kabupaten';
    protected $primaryKey = 'id_kota_kabupaten';
    protected $fillable = ['nama', 'jenis', 'id_provinsi'];
    public $timestamps = false;

    public function provinsi() {
        return $this->belongsTo(Provinsi::class, 'id_provinsi');
    }

    public function kecamatan() {
        return $this->hasMany(Kecamatan::class, 'id_kota_kabupaten');
    }
}
