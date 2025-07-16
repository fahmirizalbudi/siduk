<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kematian extends Model
{
    use HasFactory;

    protected $table = 'tb_kematian';
    protected $primaryKey = 'id_kematian';
    protected $fillable = ['NIK', 'tanggal', 'alasan'];
    public $timestamps = false;

    public function viewpenduduk() {
        return $this->belongsTo(ViewPenduduk::class, 'NIK');
    }
}
