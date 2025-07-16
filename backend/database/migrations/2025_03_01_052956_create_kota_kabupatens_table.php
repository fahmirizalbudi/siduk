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
        Schema::create('tb_kota_kabupaten', function (Blueprint $table) {
            $table->id('id_kota_kabupaten');
            $table->string('nama');
            $table->enum('jenis', ['Kota', 'Kabupaten']);
            $table->unsignedBigInteger('id_provinsi')->nullable();
            $table->foreign('id_provinsi')->references('id_provinsi')->on('tb_provinsi')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_kota_kabupaten');
    }
};
