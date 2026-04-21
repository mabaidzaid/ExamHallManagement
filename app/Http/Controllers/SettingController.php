<?php
namespace App\Http\Controllers;

use App\Models\Setting\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function appearance()
    {
        $settings = Setting::where('group', 'appearance')
            ->pluck('value', 'key');
        return Inertia::render('Settings/Appearance', [
            'settings' => $settings,
        ]);
    }

    public function saveAppearance(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => 'appearance']
            );
        }
        return redirect()->back()->with('success', 'Appearance saved');
    }

    public function email()
    {
        $settings = Setting::where('group', 'email')
            ->pluck('value', 'key');
        return Inertia::render('Settings/Email', [
            'settings' => $settings,
        ]);
    }

    public function saveEmail(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => 'email']
            );
        }
        return redirect()->back()->with('success', 'Email settings saved');
    }
}