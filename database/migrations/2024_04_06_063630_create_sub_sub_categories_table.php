<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('slug')->unique();
            $table->tinyInteger('status')->default(0);
            $table->integer('parent_id')->default(0);
            $table->string('meta_title')->nullable();
            $table->text('keywords')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_sub_categories');
    }
};
