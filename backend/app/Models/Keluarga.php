<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Keluarga extends Model
{
    use HasFactory;

    protected $table = 'tb_keluarga';
    protected $primaryKey = 'NOKK';
    protected $fillable = ['NOKK', 'alamat', 'id_rt', 'id_rw', 'kode_pos'];
    public $timestamps = false;

    public function rt() {
        return $this->belongsTo(RT::class, 'id_rt');
    }

    public function rw() {
        return $this->belongsTo(RW::class, 'id_rw');
    }

    public function desakelurahan() {
        return $this->belongsTo(DesaKelurahan::class, 'kode_pos');
    }
}
