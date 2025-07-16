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
        DB::statement("CREATE OR REPLACE VIEW viewbulan AS SELECT 1 AS bulan, 'Januari' AS nama_bulan UNION ALL
        SELECT 2, 'Februari' UNION ALL
        SELECT 3, 'Maret' UNION ALL
        SELECT 4, 'April' UNION ALL
        SELECT 5, 'Mei' UNION ALL
        SELECT 6, 'Juni' UNION ALL
        SELECT 7, 'Juli' UNION ALL
        SELECT 8, 'Agustus' UNION ALL
        SELECT 9, 'September' UNION ALL
        SELECT 10, 'Oktober' UNION ALL
        SELECT 11, 'November' UNION ALL
        SELECT 12, 'Desember';");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
