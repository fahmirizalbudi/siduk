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
        $store = "
            CREATE PROCEDURE storePendatang(
                IN p_NIK BIGINT UNSIGNED,
                IN p_nama VARCHAR(255),
                IN p_tempat_lahir BIGINT UNSIGNED,
                IN p_tanggal_lahir DATE,
                IN p_jk ENUM('L', 'P'),
                IN p_alamat TEXT,
                IN p_agama ENUM('Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'),
                IN p_id_pendidikan BIGINT UNSIGNED,
                IN p_id_pekerjaan BIGINT UNSIGNED,
                IN p_kewarganegaraan ENUM('WNI', 'WNA'),
                IN p_golongan_darah ENUM('A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Tidak Tahu'),
                IN p_tanggal_datang DATE,
                IN p_alasan TEXT
            )

            BEGIN
                INSERT INTO tb_penduduk VALUES (p_NIK, p_nama, p_tempat_lahir, p_tanggal_lahir, p_jk, p_alamat, p_agama, p_id_pendidikan, p_id_pekerjaan, p_kewarganegaraan, p_golongan_darah);
                INSERT INTO tb_pendatang VALUES (null, p_NIK, p_tanggal_datang, p_alasan);
            END
        ";
        $update = "
            CREATE PROCEDURE updatePendatang(
                IN p_NIK_update BIGINT UNSIGNED,
                IN p_NIK BIGINT UNSIGNED,
                IN p_nama VARCHAR(255),
                IN p_tempat_lahir BIGINT UNSIGNED,
                IN p_tanggal_lahir DATE,
                IN p_jk ENUM('L', 'P'),
                IN p_alamat TEXT,
                IN p_agama ENUM('Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'),
                IN p_id_pendidikan BIGINT UNSIGNED,
                IN p_id_pekerjaan BIGINT UNSIGNED,
                IN p_kewarganegaraan ENUM('WNI', 'WNA'),
                IN p_golongan_darah ENUM('A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Tidak Tahu'),
                IN p_tanggal_datang DATE,
                IN p_alasan TEXT
            )
            BEGIN
                UPDATE tb_penduduk 
                SET nama = p_nama, 
                    NIK = p_NIK,
                    tempat_lahir = p_tempat_lahir, 
                    tanggal_lahir = p_tanggal_lahir, 
                    jk = p_jk, 
                    alamat = p_alamat, 
                    agama = p_agama, 
                    id_pendidikan = p_id_pendidikan, 
                    id_pekerjaan = p_id_pekerjaan, 
                    kewarganegaraan = p_kewarganegaraan, 
                    golongan_darah = p_golongan_darah
                WHERE NIK = p_NIK_update;
                UPDATE tb_pendatang 
                SET tanggal_datang = p_tanggal_datang, 
                    NIK = p_NIK,
                    alasan = p_alasan
                WHERE NIK = p_NIK_update;
            END
        ";
        DB::unprepared('DROP PROCEDURE IF EXISTS storePendatang');
        DB::unprepared($store);
        DB::unprepared('DROP PROCEDURE IF EXISTS updatePendatang');
        DB::unprepared($update);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS storePendatang');
    }
};
