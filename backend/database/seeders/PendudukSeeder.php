<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PendudukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_penduduk')->insert([
            ['NIK' => 1234567890123456, 'nama' => 'Budi Santoso', 'tempat_lahir' => 2, 'tanggal_lahir' => '1990-01-01', 'jk' => 'L', 'alamat' => 'Jl. Merdeka No.1', 'agama' => 'Islam', 'id_pendidikan' => 1, 'id_pekerjaan' => 1, 'kewarganegaraan' => 'WNI', 'golongan_darah' => 'O'],
            ['NIK' => 6543210987654321, 'nama' => 'Siti Aminah', 'tempat_lahir' => 3, 'tanggal_lahir' => '1995-05-05', 'jk' => 'P', 'alamat' => 'Jl. Diponegoro No.2', 'agama' => 'Kristen', 'id_pendidikan' => 2, 'id_pekerjaan' => 2, 'kewarganegaraan' => 'WNI', 'golongan_darah' => 'A'],
            ['NIK' => 8139137813719372, 'nama' => 'Udin Mulkus', 'tempat_lahir' => 1, 'tanggal_lahir' => '1997-05-05', 'jk' => 'L', 'alamat' => 'Jl. Asia Afrika No.2', 'agama' => 'Islam', 'id_pendidikan' => 3, 'id_pekerjaan' => 4, 'kewarganegaraan' => 'WNI', 'golongan_darah' => 'B'],
            ['NIK' => 9281982197271728, 'nama' => 'Apip  Aqua', 'tempat_lahir' => 4, 'tanggal_lahir' => '1998-06-05', 'jk' => 'L', 'alamat' => 'Jl. Brigif No.2', 'agama' => 'Islam', 'id_pendidikan' => 1, 'id_pekerjaan' => 1, 'kewarganegaraan' => 'WNI', 'golongan_darah' => 'B-'],
        ]);
    }
}
