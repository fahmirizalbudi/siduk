<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PekerjaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_pekerjaan')->insert([
            ['id_pekerjaan' => 1, 'keterangan' => 'Programmer'],
            ['id_pekerjaan' => 2, 'keterangan' => 'Guru'],
        ]);
    }
}
