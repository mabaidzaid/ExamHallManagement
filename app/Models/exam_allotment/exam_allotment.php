<?php
namespace App\Models\exam_allotment;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\exams\Exams;
use App\Models\Room\Room;

class exam_allotment extends Model
{
    use HasFactory;

    protected $table = 'exam_allotments';

    protected $fillable = [
        'exam_id', 'room_id', 'total_seats',
        'allocated_seats', 'is_overflow',
    ];

    protected $casts = [
        'is_overflow' => 'boolean',
    ];

    // Relationships
    public function exam()
    {
        return $this->belongsTo(Exams::class, 'exam_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}