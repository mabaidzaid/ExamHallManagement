<?php
namespace App\Models\Room_Type;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Room\Room;

class Room_Type extends Model
{
    use HasFactory;

    protected $table = 'room_types';

    protected $fillable = [
        'name', 'description',
    ];

    // Relationships
    public function rooms()
    {
        return $this->hasMany(Room::class, 'room_type_id');
    }
}