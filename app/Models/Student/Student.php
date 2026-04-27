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

    /**
     * Centralized dynamic eligibility check
     * Logic: Fee Status (Paid) AND Attendance (75%+) required.
     */
    public function isEligibleFor($examId)
    {
        // 1. Hard Block: Fee Status (Supreme Priority)
        if ($this->fee_status !== 'paid') {
            return false;
        }

        // 2. Check for Audited Logic
        $eligibility = $this->eligibility()->where('exam_id', $examId)->first();
        if ($eligibility) {
            return (bool) $eligibility->is_eligible;
        }

        // 3. Live Fallback Logic (If no audit record exists)
        $totalClasses = $this->attendances()->count();
        if ($totalClasses === 0) return true; // New students with no classes yet

        $presentClasses = $this->attendances()
            ->whereIn('status', ['present', 'Present'])
            ->count();
        
        $percentage = ($presentClasses / $totalClasses) * 100;
        
        return $percentage >= 75; 
    }
}