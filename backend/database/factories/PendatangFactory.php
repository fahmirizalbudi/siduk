<?php

namespace Database\Factories;

use App\Models\Pendatang;
use App\Models\Penduduk;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pendatang>
 */
class PendatangFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Pendatang::class;

    public function definition(): array
    {
        static $nikList = null;
        return [
            'NIK' => function () use (&$nikList) {
                if ($nikList === null) {
                    $nikList = Penduduk::pluck('NIK')->shuffle()->all();
                }
                return array_pop($nikList);
            },
            'tanggal_datang' => $this->faker->date(),
            'alasan' => $this->faker->randomNumber(),
        ];
    }
}
