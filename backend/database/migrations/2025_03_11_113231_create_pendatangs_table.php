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
        Schema::create('tb_pendatang', function (Blueprint $table) {
            $table->id('id_pendatang');
            $table->unsignedBigInteger('NIK')->unique();
            $table->date('tanggal_datang');
            $table->text('alasan');
            $table->foreign('NIK')->references('NIK')->on('tb_penduduk')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pendatang');
    }
};
