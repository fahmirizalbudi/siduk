<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DesaKelurahanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_desa_kelurahan')->insert([
            ['kode_pos' => 40161, 'nama' => 'Pasteur', 'jenis' => 'Kelurahan', 'id_kecamatan' => 4],
            ['kode_pos' => 40532, 'nama' => 'Leuwigajah', 'jenis' => 'Kelurahan', 'id_kecamatan' => 2],
            ['kode_pos' => 40531, 'nama' => 'Baros', 'jenis' => 'Kelurahan', 'id_kecamatan' => 1],
            ['kode_pos' => 40522, 'nama' => 'Cibeber', 'jenis' => 'Kelurahan', 'id_kecamatan' => 2],
            ['kode_pos' => 40533, 'nama' => 'Utama', 'jenis' => 'Kelurahan', 'id_kecamatan' => 2],
        ]);
    }
}
