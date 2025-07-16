<?php

namespace Database\Factories;

use App\Models\Penduduk;
use App\Models\Kematian;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kematian>
 */
class KematianFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Kematian::class;

    public function definition(): array
    {
        return [
            'tanggal' => $this->faker->date(),
            'alasan' => $this->faker->randomNumber(),
        ];
    }
}
