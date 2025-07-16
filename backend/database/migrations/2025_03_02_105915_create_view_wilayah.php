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
        DB::statement("CREATE OR REPLACE VIEW viewWilayah as SELECT tb_desa_kelurahan.kode_pos, CONCAT(tb_desa_kelurahan.jenis, ' ', tb_desa_kelurahan.nama) as desa_kelurahan, tb_kecamatan.nama_kecamatan, CONCAT(tb_kota_kabupaten.jenis, ' ', tb_kota_kabupaten.nama) as kota_kabupaten, tb_provinsi.nama_provinsi FROM `tb_desa_kelurahan` INNER JOIN tb_kecamatan ON tb_desa_kelurahan.id_kecamatan = tb_kecamatan.id_kecamatan INNER JOIN tb_kota_kabupaten ON tb_kecamatan.id_kota_kabupaten = tb_kota_kabupaten.id_kota_kabupaten INNER JOIN tb_provinsi ON tb_kota_kabupaten.id_provinsi = tb_provinsi.id_provinsi");
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS viewWilayah");
    }
};
