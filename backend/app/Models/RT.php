<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RT extends Model
{
    protected $table = 'tb_rt';
    protected $primaryKey = 'id_rt';
    protected $fillable = ['rt'];
    public $timestamps = false;

    public function keluarga() {
        return $this->hasMany(Keluarga::class, 'id_rt');
    }
}
