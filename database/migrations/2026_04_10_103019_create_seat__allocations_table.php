<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seat_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained('exams')->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('students')->cascadeOnDelete();
            $table->foreignId('room_id')->constrained('rooms')->cascadeOnDelete();
            $table->string('seat_number')->nullable();
            $table->enum('status', [
                'allocated',
                'shifted',     // room shifting if full
                'cancelled'
            ])->default('allocated');
            $table->timestamps();

            $table->unique(['exam_id', 'student_id']); // one seat per student per exam
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seat_allocations');
    }
};