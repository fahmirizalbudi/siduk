<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailKeluarga extends Model
{
    protected $table = 'tb_detail_keluarga';
    protected $fillable = ['NOKK', 'NIK', 'status_hubungan', 'nik_ayah', 'nik_ibu'];
    public $timestamps = false;
}
