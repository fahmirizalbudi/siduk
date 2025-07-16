<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewPenduduk extends Model
{
    protected $table = 'viewpenduduk';
    protected $primaryKey = 'NIK';
    public $incrementing = false;
    public $timestamps = false;

    public function kematian() {
        return $this->hasOne(Kematian::class, 'NIK');
    }

    public function pindah() {
        return $this->hasOne(Pindah::class, 'NIK');
    }
}
