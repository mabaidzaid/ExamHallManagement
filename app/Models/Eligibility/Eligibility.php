<?php
namespace App\Models\Eligibility;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Student\Student;
use App\Models\exams\Exams;

class Eligibility extends Model
{
    use HasFactory;

    protected $table = 'eligibility_checks';

    protected $fillable = [
        'student_id', 'exam_id',
        'attendance_percentage', 'is_eligible', 'reason',
        'admin_override',
    ];

    protected $casts = [
        'is_eligible'            => 'boolean',
        'admin_override'         => 'boolean',
        'attendance_percentage'  => 'decimal:2',
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
}