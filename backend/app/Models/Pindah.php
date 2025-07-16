<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pindah extends Model
{
    use HasFactory;

    protected $table = 'tb_pindah';
    protected $primaryKey = 'id_pindah';
    protected $fillable = ['NIK', 'tanggal_pindah', 'alasan'];
    public $timestamps = false;

    public function viewpenduduk() {
        return $this->belongsTo(ViewPenduduk::class, 'NIK');
    }
}
