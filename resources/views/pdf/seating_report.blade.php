<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Master Seating Report - {{ $exam->title }}</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; color: #1a202c; padding: 10px; }
        .header { text-align: center; border-bottom: 2px solid #2d3748; padding-bottom: 15px; margin-bottom: 20px; }
        .title { font-size: 20px; font-weight: bold; text-transform: uppercase; color: #2b6cb0; }
        .info { font-size: 11px; color: #4a5568; margin-top: 5px; }
        .room-section { margin-bottom: 30px; page-break-inside: avoid; }
        .room-header { background: #edf2f7; padding: 8px 15px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #3182ce; }
        .room-name { font-size: 14px; font-weight: bold; color: #2b6cb0; }
        .room-stats { font-size: 9px; color: #718096; text-transform: uppercase; margin-top: 2px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f7fafc; font-size: 9px; text-transform: uppercase; color: #718096; text-align: left; padding: 8px 12px; border: 1px solid #e2e8f0; }
        td { padding: 8px 12px; border: 1px solid #e2e8f0; font-size: 10px; font-weight: bold; }
        .seat-badge { background: #ebf8ff; color: #2b6cb0; padding: 2px 6px; border-radius: 4px; border: 1px solid #bee3f8; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 8px; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Global International School</div>
        <div class="doc">MASTER SEATING PLAN</div>
        <div class="info">
            EXAM: {{ $exam->title }} | DATE: {{ $exam->exam_date }}
        </div>
    </div>

    @foreach($grouped as $roomName => $students)
    <div class="room-section">
        <div class="room-header">
            <div class="room-name">{{ $roomName }}</div>
            <div class="room-stats">{{ $students->count() }} Students Assigned</div>
        </div>
        <table>
            <thead>
                <tr>
                    <th style="width: 15%;">Seat #</th>
                    <th style="width: 25%;">Admission No</th>
                    <th style="width: 40%;">Student Name</th>
                    <th style="width: 20%;">Signature</th>
                </tr>
            </thead>
            <tbody>
                @foreach($students as $allotment)
                <tr>
                    <td><span class="seat-badge">Seat: {{ str_replace('S-', '', $allotment->seat_number) }}</span></td>
                    <td>{{ $allotment->student->admission_number }}</td>
                    <td>{{ $allotment->student->user->name }}</td>
                    <td style="border-bottom: 1px solid #e2e8f0;"></td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endforeach

    <div class="footer">
        Office of the Controller of Examinations | Generated: {{ now()->format('M d, Y h:i A') }}
    </div>
</body>
</html>
