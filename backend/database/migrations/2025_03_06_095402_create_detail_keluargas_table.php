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
        Schema::create('tb_detail_keluarga', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('NOKK');
            $table->unsignedBigInteger('NIK')->unique();
            $table->enum('status_hubungan', ['Kepala Keluarga', 'Istri', 'Anak', 'Menantu', 'Cucu', 'Orang Tua', 'Mertua', 'Famili Lain']);
            $table->unsignedBigInteger('nik_ayah')->nullable();
            $table->unsignedBigInteger('nik_ibu')->nullable();
            $table->foreign('NOKK')->references('NOKK')->on('tb_keluarga')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('NIK')->references('NIK')->on('tb_penduduk')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('nik_ayah')->references('NIK')->on('tb_penduduk')->nullOnDelete()->cascadeOnUpdate();
            $table->foreign('nik_ibu')->references('NIK')->on('tb_penduduk')->nullOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_detail_keluarga');
    }
};
