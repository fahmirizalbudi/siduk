<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provinsi extends Model
{
    protected $table = 'tb_provinsi';
    protected $primaryKey = 'id_provinsi';
    protected $fillable = ['nama_provinsi'];
    public $timestamps = false;

    public function kotakabupaten() {
        return $this->hasMany(KotaKabupaten::class, 'id_provinsi');
    }
}
