<?php
namespace App\Models\Teacher;

use App\Models\User;
use App\Models\Classes\Classes;
use App\Models\exams\Exams;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Teacher extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'department', 'designation', 'qualification',
        'experience', 'contact_number', 'email', 'address',
        'city', 'state', 'country', 'profile_picture',
        'status', 'joining_date', 'cv',
        'id_card_front', 'id_card_back', 'gender',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classes()
    {
        return $this->hasMany(Classes::class, 'teacher_id');
    }

    public function exams()
    {
        return $this->hasMany(Exams::class, 'teacher_id');
    }
}