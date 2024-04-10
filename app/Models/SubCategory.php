<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;
    protected $table = 'sub_categories';

    protected $fillable = [
        'name',
        'parent_id',
        'slug',
        'status'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function parentCategory(){
        return $this->hasOne(Category::class,'id','parent_id');
    }
}
