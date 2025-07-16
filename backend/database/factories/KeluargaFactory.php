<?php

namespace Database\Factories;

use App\Models\DesaKelurahan;
use App\Models\Keluarga;
use App\Models\RT;
use App\Models\RW;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Keluarga>
 */
class KeluargaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Keluarga::class;

    public function definition(): array
    {
        return [
            'NOKK' => $this->faker->unique()->numerify('################'),
            'alamat' => $this->faker->streetAddress(),
            'id_rt' => RT::inRandomOrder()->first()->id_rt ?? null,
            'id_rw' => RW::inRandomOrder()->first()->id_rw ?? null,
            'kode_pos' => DesaKelurahan::inRandomOrder()->first()->kode_pos ?? null,
        ];
    }
}
