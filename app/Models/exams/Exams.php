<?php
namespace App\Models\exams;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Subject\Subject;
use App\Models\Classes\Classes;
use App\Models\exam_allotment\exam_allotment;
use App\Models\Seat_Allocation\Seat_Allocation;
use App\Models\hall_ticket\hall_ticket;
use App\Models\Eligibility\Eligibility;

class Exams extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'subject_id', 'class_id',
        'exam_date', 'start_time', 'end_time',
        'status', 'remarks',
    ];

    protected $casts = [
        'exam_date' => 'date:Y-m-d',
    ];

    // Relationships
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function class()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    public function allotments()
    {
        return $this->hasMany(exam_allotment::class, 'exam_id');
    }

    public function seatAllocations()
    {
        return $this->hasMany(Seat_Allocation::class, 'exam_id');
    }

    public function hallTickets()
    {
        return $this->hasMany(hall_ticket::class, 'exam_id');
    }

    public function eligibilityChecks()
    {
        return $this->hasMany(Eligibility::class, 'exam_id');
    }
}