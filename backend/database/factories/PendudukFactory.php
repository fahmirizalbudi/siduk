<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Penduduk;
use App\Models\KotaKabupaten;
use App\Models\Pendidikan;
use App\Models\Pekerjaan;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Penduduk>
 */
class PendudukFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    protected $model = Penduduk::class;

    public function definition(): array
    {
        return [
            'NIK' => $this->faker->unique()->numerify('################'),
            'nama' => $this->faker->name(),
            'tempat_lahir' => KotaKabupaten::inRandomOrder()->first()->id_kota_kabupaten ?? null,
            'tanggal_lahir' => $this->faker->dateTimeBetween('-100 years', '-18 years')->format('Y-m-d'),
            'jk' => $this->faker->randomElement(['L', 'P']),
            'alamat' => $this->faker->streetAddress(),
            'agama' => $this->faker->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
            'id_pendidikan' => Pendidikan::inRandomOrder()->first()->id_pendidikan ?? null,
            'id_pekerjaan' => Pekerjaan::inRandomOrder()->first()->id_pekerjaan ?? null,
            'kewarganegaraan' => $this->faker->randomElement(['WNI', 'WNA']),
            'golongan_darah' => $this->faker->randomElement(['A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Tidak Tahu']),
        ];
    }
}