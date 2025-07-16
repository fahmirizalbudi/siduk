<?php

namespace Database\Seeders;

use App\Models\KotaKabupaten;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KotaKabupatenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kota_kabupaten = [
            ['nama' => 'Banda Aceh', 'jenis' => 'Kota', 'id_provinsi' => 1],
            ['nama' => 'Aceh Besar', 'jenis' => 'Kabupaten', 'id_provinsi' => 1],
            ['nama' => 'Medan', 'jenis' => 'Kota', 'id_provinsi' => 2],
            ['nama' => 'Deli Serdang', 'jenis' => 'Kabupaten', 'id_provinsi' => 2],
            ['nama' => 'Padang', 'jenis' => 'Kota', 'id_provinsi' => 3],
            ['nama' => 'Solok', 'jenis' => 'Kabupaten', 'id_provinsi' => 3],
            ['nama' => 'Pekanbaru', 'jenis' => 'Kota', 'id_provinsi' => 4],
            ['nama' => 'Kampar', 'jenis' => 'Kabupaten', 'id_provinsi' => 4],
            ['nama' => 'Jambi', 'jenis' => 'Kota', 'id_provinsi' => 5],
            ['nama' => 'Muaro Jambi', 'jenis' => 'Kabupaten', 'id_provinsi' => 5],
            ['nama' => 'Palembang', 'jenis' => 'Kota', 'id_provinsi' => 6],
            ['nama' => 'Banyuasin', 'jenis' => 'Kabupaten', 'id_provinsi' => 6],
            ['nama' => 'Bengkulu', 'jenis' => 'Kota', 'id_provinsi' => 7],
            ['nama' => 'Rejang Lebong', 'jenis' => 'Kabupaten', 'id_provinsi' => 7],
            ['nama' => 'Bandar Lampung', 'jenis' => 'Kota', 'id_provinsi' => 8],
            ['nama' => 'Lampung Selatan', 'jenis' => 'Kabupaten', 'id_provinsi' => 8],
            ['nama' => 'Pangkal Pinang', 'jenis' => 'Kota', 'id_provinsi' => 9],
            ['nama' => 'Bangka', 'jenis' => 'Kabupaten', 'id_provinsi' => 9],
            ['nama' => 'Tanjung Pinang', 'jenis' => 'Kota', 'id_provinsi' => 10],
            ['nama' => 'Bintan', 'jenis' => 'Kabupaten', 'id_provinsi' => 10],
            ['nama' => 'Jakarta Selatan', 'jenis' => 'Kota', 'id_provinsi' => 11],
            ['nama' => 'Kepulauan Seribu', 'jenis' => 'Kabupaten', 'id_provinsi' => 11],
            ['nama' => 'Bandung', 'jenis' => 'Kota', 'id_provinsi' => 12],
            ['nama' => 'Cimahi', 'jenis' => 'Kota', 'id_provinsi' => 12],
            ['nama' => 'Bogor', 'jenis' => 'Kabupaten', 'id_provinsi' => 12],
            ['nama' => 'Semarang', 'jenis' => 'Kota', 'id_provinsi' => 13],
            ['nama' => 'Magelang', 'jenis' => 'Kabupaten', 'id_provinsi' => 13],
            ['nama' => 'Yogyakarta', 'jenis' => 'Kota', 'id_provinsi' => 14],
            ['nama' => 'Sleman', 'jenis' => 'Kabupaten', 'id_provinsi' => 14],
            ['nama' => 'Surabaya', 'jenis' => 'Kota', 'id_provinsi' => 15],
            ['nama' => 'Malang', 'jenis' => 'Kabupaten', 'id_provinsi' => 15],
            ['nama' => 'Serang', 'jenis' => 'Kota', 'id_provinsi' => 16],
            ['nama' => 'Pandeglang', 'jenis' => 'Kabupaten', 'id_provinsi' => 16],
            ['nama' => 'Denpasar', 'jenis' => 'Kota', 'id_provinsi' => 17],
            ['nama' => 'Badung', 'jenis' => 'Kabupaten', 'id_provinsi' => 17],
            ['nama' => 'Mataram', 'jenis' => 'Kota', 'id_provinsi' => 18],
            ['nama' => 'Lombok Barat', 'jenis' => 'Kabupaten', 'id_provinsi' => 18],
            ['nama' => 'Kupang', 'jenis' => 'Kota', 'id_provinsi' => 19],
            ['nama' => 'Belu', 'jenis' => 'Kabupaten', 'id_provinsi' => 19],
            ['nama' => 'Pontianak', 'jenis' => 'Kota', 'id_provinsi' => 20],
            ['nama' => 'Ketapang', 'jenis' => 'Kabupaten', 'id_provinsi' => 20],
            ['nama' => 'Palangka Raya', 'jenis' => 'Kota', 'id_provinsi' => 21],
            ['nama' => 'Kapuas', 'jenis' => 'Kabupaten', 'id_provinsi' => 21],
            ['nama' => 'Banjarmasin', 'jenis' => 'Kota', 'id_provinsi' => 22],
            ['nama' => 'Banjar', 'jenis' => 'Kabupaten', 'id_provinsi' => 22],
            ['nama' => 'Samarinda', 'jenis' => 'Kota', 'id_provinsi' => 23],
            ['nama' => 'Kutai Kartanegara', 'jenis' => 'Kabupaten', 'id_provinsi' => 23],
            ['nama' => 'Tarakan', 'jenis' => 'Kota', 'id_provinsi' => 24],
            ['nama' => 'Bulungan', 'jenis' => 'Kabupaten', 'id_provinsi' => 24],
            ['nama' => 'Manado', 'jenis' => 'Kota', 'id_provinsi' => 25],
            ['nama' => 'Minahasa', 'jenis' => 'Kabupaten', 'id_provinsi' => 25],
            ['nama' => 'Palu', 'jenis' => 'Kota', 'id_provinsi' => 26],
            ['nama' => 'Donggala', 'jenis' => 'Kabupaten', 'id_provinsi' => 26],
            ['nama' => 'Makassar', 'jenis' => 'Kota', 'id_provinsi' => 27],
            ['nama' => 'Gowa', 'jenis' => 'Kabupaten', 'id_provinsi' => 27],
            ['nama' => 'Kendari', 'jenis' => 'Kota', 'id_provinsi' => 28],
            ['nama' => 'Kolaka', 'jenis' => 'Kabupaten', 'id_provinsi' => 28],
            ['nama' => 'Gorontalo', 'jenis' => 'Kota', 'id_provinsi' => 29],
            ['nama' => 'Boalemo', 'jenis' => 'Kabupaten', 'id_provinsi' => 29],
            ['nama' => 'Mamuju', 'jenis' => 'Kota', 'id_provinsi' => 30],
            ['nama' => 'Polewali Mandar', 'jenis' => 'Kabupaten', 'id_provinsi' => 30],
            ['nama' => 'Ambon', 'jenis' => 'Kota', 'id_provinsi' => 31],
            ['nama' => 'Maluku Tengah', 'jenis' => 'Kabupaten', 'id_provinsi' => 31],
            ['nama' => 'Ternate', 'jenis' => 'Kota', 'id_provinsi' => 32],
            ['nama' => 'Halmahera Barat', 'jenis' => 'Kabupaten', 'id_provinsi' => 32],
            ['nama' => 'Jayapura', 'jenis' => 'Kota', 'id_provinsi' => 33],
            ['nama' => 'Keerom', 'jenis' => 'Kabupaten', 'id_provinsi' => 33],
            ['nama' => 'Manokwari', 'jenis' => 'Kota', 'id_provinsi' => 34],
            ['nama' => 'Sorong', 'jenis' => 'Kabupaten', 'id_provinsi' => 34],
            ['nama' => 'Merauke', 'jenis' => 'Kota', 'id_provinsi' => 35],
            ['nama' => 'Asmat', 'jenis' => 'Kabupaten', 'id_provinsi' => 35],
            ['nama' => 'Nabire', 'jenis' => 'Kota', 'id_provinsi' => 36],
            ['nama' => 'Paniai', 'jenis' => 'Kabupaten', 'id_provinsi' => 36],
            ['nama' => 'Wamena', 'jenis' => 'Kota', 'id_provinsi' => 37],
            ['nama' => 'Lanny Jaya', 'jenis' => 'Kabupaten', 'id_provinsi' => 37],
            ['nama' => 'Fakfak', 'jenis' => 'Kota', 'id_provinsi' => 38],
            ['nama' => 'Tambrauw', 'jenis' => 'Kabupaten', 'id_provinsi' => 38],
        ];

        foreach($kota_kabupaten as $data) {
            KotaKabupaten::create($data);
        }
    }
}
