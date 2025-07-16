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
        Schema::create('tb_desa_kelurahan', function (Blueprint $table) {
            $table->bigInteger('kode_pos')->unsigned()->primary();
            $table->string('nama');
            $table->enum('jenis', ['Desa', 'Kelurahan']);
            $table->unsignedBigInteger('id_kecamatan');
            $table->foreign('id_kecamatan')->references('id_kecamatan')->on('tb_kecamatan')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_desa_kelurahan');
    }
};
