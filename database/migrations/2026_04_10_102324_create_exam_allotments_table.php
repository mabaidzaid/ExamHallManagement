<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_allotments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained('exams')->cascadeOnDelete();
            $table->foreignId('room_id')->constrained('rooms')->cascadeOnDelete();
            $table->integer('total_seats');
            $table->integer('allocated_seats')->default(0);
            $table->boolean('is_overflow')->default(false); // room shifting if full
            $table->timestamps();

            $table->unique(['exam_id', 'room_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_allotments');
    }
};