<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PendidikanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_pendidikan')->insert([
            ['id_pendidikan' => 1, 'keterangan' => 'SMA'],
            ['id_pendidikan' => 2, 'keterangan' => 'S1'],
        ]);
    }
}
