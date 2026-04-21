<?php
namespace App\Http\Controllers;

use App\Models\Room_Type\Room_Type;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomTypeController extends Controller
{
    public function index()
    {
        $roomTypes = Room_Type::withCount('rooms')->latest()->get();
        return Inertia::render('Rooms/RoomTypes', ['roomTypes' => $roomTypes]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Room_Type::create($request->only('name', 'description'));

        return redirect()->back()->with('success', 'Room type added');
    }

    public function destroy(Room_Type $roomType)
    {
        $roomType->delete();
        return redirect()->back()->with('success', 'Room type removed');
    }
}