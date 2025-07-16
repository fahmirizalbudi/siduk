<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE OR REPLACE VIEW viewkelahiran AS SELECT tb_kelahiran.id_kelahiran, tb_kelahiran.nama, tb_kelahiran.tanggal_lahir, tb_kelahiran.tempat, tb_kelahiran.nik_ayah, ayah.nama as ayah, tb_kelahiran.nik_ibu, ibu.nama as ibu FROM `tb_kelahiran` LEFT JOIN tb_penduduk as ayah ON ayah.NIK = tb_kelahiran.nik_ayah LEFT JOIN tb_penduduk as ibu ON ibu.NIK = tb_kelahiran.nik_ibu;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
