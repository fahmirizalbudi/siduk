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
        Schema::create('tb_keluarga', function (Blueprint $table) {
            $table->unsignedBigInteger('NOKK')->primary()->autoIncrement(false);
            $table->text('alamat');
            $table->unsignedBigInteger('id_rt')->nullable();
            $table->unsignedBigInteger('id_rw')->nullable();
            $table->unsignedBigInteger('kode_pos')->nullable();
            $table->foreign('id_rt')->references('id_rt')->on('tb_rt')->nullOnDelete();
            $table->foreign('id_rw')->references('id_rw')->on('tb_rw')->nullOnDelete();
            $table->foreign('kode_pos')->references('kode_pos')->on('tb_desa_kelurahan')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_keluarga');
    }
};
