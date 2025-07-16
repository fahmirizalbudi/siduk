<?php

namespace Database\Factories;

use App\Models\Penduduk;
use App\Models\Pindah;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pindah>
 */
class PindahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Pindah::class;

    public function definition(): array
    {
        return [
            'tanggal_pindah' => $this->faker->date(),
            'alasan' => $this->faker->randomNumber(),
        ];
    }
}
