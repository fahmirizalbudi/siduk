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
        Schema::create('tb_kecamatan', function (Blueprint $table) {
            $table->id('id_kecamatan');
            $table->string('nama_kecamatan');
            $table->unsignedBigInteger('id_kota_kabupaten')->nullable();
            $table->foreign('id_kota_kabupaten')->references('id_kota_kabupaten')->on('tb_kota_kabupaten')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_kecamatan');
    }
};
