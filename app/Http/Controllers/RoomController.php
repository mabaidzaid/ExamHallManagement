<?php
namespace App\Http\Controllers;

use App\Models\Room\Room;
use App\Models\Room_Type\Room_Type;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::with('roomType')->latest()->paginate(10);
        return Inertia::render('Rooms/Index', ['rooms' => $rooms]);
    }

    public function create()
    {
        $roomTypes = Room_Type::all();
        return Inertia::render('Rooms/Create', ['roomTypes' => $roomTypes]);
    }

    public function show(Room $room)
    {
        $room->load('roomType');
        return Inertia::render('Rooms/Show', ['room' => $room]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'         => 'required|string',
            'room_number'  => 'required|unique:rooms',
            'room_type_id' => 'required|exists:room_types,id',
            'capacity'     => 'required|integer|min:1',
        ]);

        Room::create($request->only(
            'name','room_number','room_type_id','capacity','is_active'
        ));

        return redirect()->route('rooms.index')
            ->with('success', 'Room added successfully');
    }

    public function edit(Room $room)
    {
        $roomTypes = Room_Type::all();
        return Inertia::render('Rooms/Edit', [
            'room' => $room->load('roomType'),
            'roomTypes' => $roomTypes
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $request->validate([
            'name'         => 'required|string',
            'room_number'  => 'required|unique:rooms,room_number,' . $room->id,
            'room_type_id' => 'required|exists:room_types,id',
            'capacity'     => 'required|integer|min:1',
            'is_active'    => 'nullable|boolean',
        ]);

        $room->update($request->only(
            'name','room_number','room_type_id','capacity','is_active'
        ));

        return redirect()->route('rooms.index')
            ->with('success', 'Room updated successfully');
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('rooms.index')
            ->with('success', 'Room removed successfully');
    }

    public function toggleStatus(Room $room)
    {
        $room->update([
            'is_active' => !$room->is_active
        ]);

        return redirect()->back();
    }
}