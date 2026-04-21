<?php
namespace App\Models\hall_ticket;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Student\Student;
use App\Models\exams\exams as Exams;
use App\Models\Seat_Allocation\Seat_Allocation;
 
class hall_ticket extends Model
{
    use HasFactory;

    protected $table = 'hall_tickets';

    protected $fillable = [
        'student_id', 'exam_id', 'seat_allocation_id',
        'ticket_number', 'is_eligible', 'pdf_path', 'generated_at',
    ];

    protected $casts = [
        'is_eligible'    => 'boolean',
        'generated_at'   => 'datetime',
    ];

    // Relationships
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exams::class, 'exam_id');
    }

    public function seatAllocation()
    {
        return $this->belongsTo(Seat_Allocation::class);
    }
}