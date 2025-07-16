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
        Schema::create('tb_kelahiran', function (Blueprint $table) {
            $table->id('id_kelahiran');
            $table->string('nama');
            $table->date('tanggal_lahir');
            $table->string('tempat');
            $table->unsignedBigInteger('nik_ayah')->nullable();
            $table->unsignedBigInteger('nik_ibu')->nullable();
            $table->foreign('nik_ayah')->references('NIK')->on('tb_penduduk')->nullOnDelete()->cascadeOnUpdate();
            $table->foreign('nik_ibu')->references('NIK')->on('tb_penduduk')->nullOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_kelahiran');
    }
};
