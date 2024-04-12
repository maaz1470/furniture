<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubSubCategory extends Model
{
    use HasFactory; 
    protected $table = 'sub_sub_categories';

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function parentCategories(){
        return $this->hasOne(SubCategory::class, 'id','parent_id');
    }
}
