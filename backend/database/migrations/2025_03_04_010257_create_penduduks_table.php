<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_penduduk', function (Blueprint $table) {
            $table->bigInteger('NIK')->unsigned()->primary();
            $table->string('nama');
            $table->unsignedBigInteger('tempat_lahir')->nullable();
            $table->date('tanggal_lahir');
            $table->enum('jk', ['L', 'P']);
            $table->text('alamat');
            $table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']);
            $table->unsignedBigInteger('id_pendidikan')->nullable();
            $table->unsignedBigInteger('id_pekerjaan')->nullable();
            $table->enum('kewarganegaraan', ['WNI', 'WNA']);
            $table->enum('golongan_darah', ['A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Tidak Tahu']);
            $table->foreign('tempat_lahir')->references('id_kota_kabupaten')->on('tb_kota_kabupaten')->nullOnDelete();
            $table->foreign('id_pendidikan')->references('id_pendidikan')->on('tb_pendidikan')->nullOnDelete();
            $table->foreign('id_pekerjaan')->references('id_pekerjaan')->on('tb_pekerjaan')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_penduduk');
    }
};
