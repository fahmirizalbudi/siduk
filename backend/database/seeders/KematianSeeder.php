<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KematianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_kematian')->insert([
            ['id_kematian' => 1, 'NIK' => 1234567890123456, 'tanggal' => '2023-01-01', 'alasan' => 'Kecelakaan'],
        ]);
    }
}
