<?php
namespace App\Models\Room;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Room_Type\Room_Type;
use App\Models\exam_allotment\exam_allotment;
use App\Models\Seat_Allocation\Seat_Allocation;

class Room extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'room_number', 'room_type_id', 'capacity', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relationships
    public function roomType()
    {
        return $this->belongsTo(Room_Type::class, 'room_type_id');
    }

    public function examAllotments()
    {
        return $this->hasMany(exam_allotment::class);
    }

    public function seatAllocations()
    {
        return $this->hasMany(Seat_Allocation::class);
    }
}