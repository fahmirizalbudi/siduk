<?php

namespace Database\Factories;

use App\Models\Penduduk;
use App\Models\Kelahiran;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kelahiran>
 */
class KelahiranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Kelahiran::class;

    public function definition(): array
    {
        return [
            'nama' => $this->faker->name(),
            'tanggal_lahir' => $this->faker->date(),
            'tempat' => $this->faker->address(),
            'nik_ayah' => optional(Penduduk::where('jk', 'L')->inRandomOrder()->first())->NIK,
            'nik_ibu'  => optional(Penduduk::where('jk', 'P')->inRandomOrder()->first())->NIK,
        ];
    }
}
