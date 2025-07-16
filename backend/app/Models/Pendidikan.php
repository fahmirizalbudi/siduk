<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendidikan extends Model
{
    protected $table = 'tb_pendidikan';
    protected $primaryKey = 'id_pendidikan';
    protected $fillable = ['keterangan'];
    public $timestamps = false;
}
