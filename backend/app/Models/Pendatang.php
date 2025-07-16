<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pendatang extends Model
{
    use HasFactory;

    protected $table = 'tb_pendatang';
    protected $primaryKey = 'id_pendatang';
    protected $fillable = ['NIK', 'tanggal_datang', 'alasan'];
    public $timestamps = false;

    public function penduduk() {
        return $this->belongsTo(Penduduk::class, 'NIK');
    }

    public static function storeProcedure($param1, $param2, $param3, $param4, $param5, $param6, $param7, $param8, $param9, $param10, $param11, $param12, $param13) {
        return DB::statement("CALL storePendatang(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [$param1, $param2, $param3, $param4, $param5, $param6, $param7, $param8, $param9, $param10, $param11, $param12, $param13]);
    }

    public static function updateProcedure($param1, $param2, $param3, $param4, $param5, $param6, $param7, $param8, $param9, $param10, $param11, $param12, $param13, $param14) {
        return DB::statement("CALL updatePendatang(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [$param1, $param2, $param3, $param4, $param5, $param6, $param7, $param8, $param9, $param10, $param11, $param12, $param13, $param14]);
    }
}
