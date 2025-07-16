<?php

namespace Database\Seeders;

use App\Models\Kecamatan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KecamatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kecamatan = [
            ['nama_kecamatan' => 'Cimahi Utara', 'id_kota_kabupaten' => 24],
            ['nama_kecamatan' => 'Cimahi Selatan', 'id_kota_kabupaten' => 24],    
            ['nama_kecamatan' => 'Cimahi Tengan', 'id_kota_kabupaten' => 24],    
            ['nama_kecamatan' => 'Sukajadi', 'id_kota_kabupaten' => 23],    
            ['nama_kecamatan' => 'Ujungberung', 'id_kota_kabupaten' => 23],    
            ['nama_kecamatan' => 'Cibiru', 'id_kota_kabupaten' => 23],    
            ['nama_kecamatan' => 'Bandung Kulon', 'id_kota_kabupaten' => 23],    
            ['nama_kecamatan' => 'Bandung Kidul', 'id_kota_kabupaten' => 23],    
            ['nama_kecamatan' => 'Bandung Wetan', 'id_kota_kabupaten' => 23],    
        ];

        foreach ($kecamatan as $data) {
            Kecamatan::create($data);
        }
    }
}
