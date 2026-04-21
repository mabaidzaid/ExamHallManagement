<?php
namespace App\Models\Seat_Allocation;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Student\Student;
use App\Models\exams\exams as ExamsModel;
use App\Models\Room\Room;
use App\Models\hall_ticket\hall_ticket;

class Seat_Allocation extends Model
{
    use HasFactory;

    protected $table = 'seat_allocations';

    protected $fillable = [
        'exam_id', 'student_id', 'room_id',
        'seat_number', 'status',
    ];

    // Relationships
    public function exam()
    {
        return $this->belongsTo(ExamsModel::class, 'exam_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function hallTicket()
    {
        return $this->hasOne(hall_ticket::class);
    }
}