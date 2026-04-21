<?php
namespace App\Models\Classes;

use App\Models\Teacher\Teacher;
use App\Models\Student\Student;
use App\Models\exams\Exams;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classes extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'classes';

    protected $fillable = [
        'name', 'section', 'teacher_id', 'max_students', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relationships
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'class_student', 'class_id', 'student_id');
    }

    public function exams()
    {
        return $this->hasMany(Exams::class, 'class_id');
    }
}