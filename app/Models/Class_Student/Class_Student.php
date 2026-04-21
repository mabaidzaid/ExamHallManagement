<?php
namespace App\Models\Class_Student;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Class_Student extends Pivot
{
    protected $table = 'class_student';

    public $incrementing = true;

    protected $fillable = [
        'class_id', 'student_id',
    ];
}