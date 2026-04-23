<?php
namespace App\Models\Student;

use App\Models\User;
use App\Models\Classes\Classes;
use App\Models\Attendance\Attendance;
use App\Models\Seat_Allocation\Seat_Allocation;
use App\Models\hall_ticket\hall_ticket;
use App\Models\Eligibility\Eligibility;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'phone',
        'address', 'city', 'state', 'country',
        'profile_picture', 'date_of_birth', 'gender',
        'admission_number', 'admission_date', 'cnic', 'status',
        'fee_status', 'fee_override',
    ];

    protected $casts = [
        'fee_override' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'class_student', 'student_id', 'class_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function seatAllocations()
    {
        return $this->hasMany(Seat_Allocation::class);
    }

    public function hallTickets()
    {
        return $this->hasMany(hall_ticket::class);
    }

    public function eligibility()
    {
        return $this->hasMany(Eligibility::class);
    }

    public function eligibilityChecks()
    {
        return $this->hasMany(Eligibility::class);
    }
}