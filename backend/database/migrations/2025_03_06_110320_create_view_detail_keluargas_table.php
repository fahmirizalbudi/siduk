<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE OR REPLACE VIEW viewdetailkeluarga AS SELECT tb_detail_keluarga.id, tb_keluarga.NOKK, tb_detail_keluarga.NIK, penduduk.nama, IF(penduduk.jk = 'L', 'Laki - Laki', 'Perempuan')as gender, tb_detail_keluarga.status_hubungan, IF(ayah.nama is not null, ayah.nama, 'N/A') as ayah, IF(ibu.nama is not null, ibu.nama, 'N/A') as ibu FROM `tb_keluarga` LEFT JOIN tb_rt ON tb_keluarga.id_rt = tb_rt.id_rt LEFT JOIN tb_rw ON tb_keluarga.id_rw = tb_rw.id_rw INNER JOIN tb_detail_keluarga ON tb_detail_keluarga.NOKK = tb_keluarga.NOKK LEFT JOIN tb_penduduk AS penduduk ON penduduk.NIK = tb_detail_keluarga.NIK LEFT JOIN tb_penduduk AS ayah ON tb_detail_keluarga.nik_ayah = ayah.NIK LEFT JOIN tb_penduduk AS ibu ON tb_detail_keluarga.nik_ibu = ibu.NIK;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS viewdetailkeluarga");
    }
};
