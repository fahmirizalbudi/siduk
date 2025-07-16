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
        DB::statement("CREATE OR REPLACE VIEW viewpenduduk AS SELECT tb_penduduk.NIK, IF(tb_kematian.id_kematian IS NOT NULL, 'Mati', IF(tb_pindah.id_pindah IS NOT NULL, 'Pindah', IF(tb_pendatang.id_pendatang IS NOT NULL, 'Pendatang', 'Hidup'))) COLLATE utf8mb4_general_ci as status, tb_penduduk.nama, IF(tb_penduduk.tempat_lahir is not null, CONCAT(UPPER(tb_kota_kabupaten.nama), '/', tb_penduduk.tanggal_lahir), CONCAT('N/A - ', tb_penduduk.tanggal_lahir)) as ttl, tb_penduduk.jk, tb_penduduk.alamat, tb_penduduk.agama, IF(tb_pendidikan.keterangan is null,  'N/A', tb_pendidikan.keterangan) as pendidikan, IF(tb_pekerjaan.keterangan is null, 'N/A', tb_pekerjaan.keterangan) as pekerjaan, tb_penduduk.kewarganegaraan, tb_penduduk.golongan_darah FROM `tb_penduduk` LEFT JOIN tb_kota_kabupaten ON tb_penduduk.tempat_lahir = tb_kota_kabupaten.id_kota_kabupaten LEFT JOIN tb_kematian ON tb_penduduk.NIK = tb_kematian.NIK LEFT JOIN tb_pendidikan ON tb_penduduk.id_pendidikan = tb_pendidikan.id_pendidikan LEFT JOIN tb_pekerjaan ON tb_penduduk.id_pekerjaan = tb_pekerjaan.id_pekerjaan LEFT JOIN tb_pindah ON tb_pindah.NIK = tb_penduduk.NIK LEFT JOIN tb_pendatang ON tb_pendatang.NIK = tb_penduduk.NIK;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS viewpenduduk");
    }
};
