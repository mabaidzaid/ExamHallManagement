<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Hall Ticket - {{ $ticket->ticket_number }}</title>
    <style>
        @page { margin: 0; }
        body {
            font-family: 'Helvetica', sans-serif;
            padding: 40px;
            color: #1a202c;
            line-height: 1.5;
        }
        .ticket-container {
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 30px;
            position: relative;
            background: #fff;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #3182ce;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .school-name {
            font-size: 24px;
            font-weight: bold;
            color: #2b6cb0;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0;
        }
        .doc-title {
            font-size: 16px;
            color: #718096;
            margin-top: 5px;
            font-weight: bold;
        }
        .main-info {
            width: 100%;
            margin-bottom: 30px;
        }
        .info-group {
            margin-bottom: 15px;
        }
        .label {
            font-size: 10px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
            display: block;
        }
        .value {
            font-size: 14px;
            font-weight: bold;
            color: #2d3748;
        }
        .grid {
            display: table;
            width: 100%;
        }
        .grid-col {
            display: table-cell;
            width: 50%;
        }
        .seating-box {
            background: #f7fafc;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 50px;
            width: 100%;
            display: table;
        }
        .signature-box {
            display: table-cell;
            text-align: right;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            width: 200px;
        }
        .ticket-number {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #2b6cb0;
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="ticket-container">
        <div class="ticket-number">{{ $ticket->ticket_number }}</div>
        
        <div class="header">
            <h1 class="school-name">Global International School</h1>
            <div class="doc-title">OFFICIAL EXAMINATION HALL TICKET</div>
        </div>

        <div class="main-info">
            <table style="width: 100%;">
                <tr>
                    <td style="width: 70%;">
                        <div class="info-group">
                            <span class="label">Student Name</span>
                            <span class="value">{{ $ticket->student?->user?->name }}</span>
                        </div>
                        <div class="info-group">
                            <span class="label">Admission / Roll No</span>
                            <span class="value">{{ $ticket->student?->admission_number }}</span>
                        </div>
                    </td>
                    <td style="width: 30%; text-align: right;">
                        @if($ticket->student?->profile_picture && extension_loaded('gd'))
                            @php
                                $picUrl = str_starts_with($ticket->student->profile_picture, 'http') 
                                    ? $ticket->student->profile_picture 
                                    : public_path('storage/' . $ticket->student->profile_picture);
                            @endphp
                            <img src="{{ $picUrl }}" style="width: 100px; height: 100px; border-radius: 8px; border: 2px solid #edf2f7;">
                        @else
                            <div style="width: 100px; height: 100px; background: #edf2f7; border: 2px dashed #cbd5e0; text-align: center; line-height: 100px; color: #a0aec0; font-size: 10px;">
                                {{ $ticket->student?->user?->name ? strtoupper(substr($ticket->student->user->name, 0, 2)) : 'N/A' }}
                            </div>
                        @endif
                    </td>
                </tr>
            </table>
        </div>

        <div style="margin-top: 20px;">
            <h3 style="font-size: 12px; font-black uppercase tracking-widest text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">Examination Schedule & Datesheet</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <thead>
                    <tr style="background: #f7fafc;">
                        <th style="padding: 10px; border: 1px solid #edf2f7; text-align: left;">Subject</th>
                        <th style="padding: 10px; border: 1px solid #edf2f7; text-align: left;">Date</th>
                        <th style="padding: 10px; border: 1px solid #edf2f7; text-align: left;">Time Slot</th>
                        <th style="padding: 10px; border: 1px solid #edf2f7; text-align: left;">Room / Seat</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($allTickets as $t)
                    <tr>
                        <td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">{{ $t->exam?->subject?->name }}</td>
                        <td style="padding: 10px; border: 1px solid #edf2f7;">{{ \Carbon\Carbon::parse($t->exam?->exam_date)->format('M d, Y') }}</td>
                        <td style="padding: 10px; border: 1px solid #edf2f7;">{{ substr($t->exam?->start_time, 0, 5) }} - {{ substr($t->exam?->end_time, 0, 5) }}</td>
                        <td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; color: #2b6cb0;">
                            {{ $t->seatAllocation?->room?->name }} (Seat: {{ str_replace('S-', '', $t->seatAllocation?->seat_number) }})
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div style="margin-top: 40px; font-size: 10px; color: #718096; line-height: 1.6;">
            <strong>Important Instructions:</strong>
            <ol style="margin-top: 5px;">
                <li>Please report to the examination hall 15 minutes before the start time.</li>
                <li>Carry this hall ticket and a valid ID card for every examination.</li>
                <li>Electronic gadgets, mobile phones, and calculators are strictly prohibited unless authorized.</li>
            </ol>
        </div>

        <div class="footer">
            <div style="display: table-cell;">
                <span class="label">Generated On</span>
                <span class="value" style="font-size: 10px;">{{ $ticket->generated_at->format('M d, Y h:i A') }}</span>
            </div>
            <div class="signature-box">
                <span class="label">Controller of Examinations</span>
                <div style="height: 40px;"></div>
                <span class="value" style="font-size: 10px; border-top: 1px solid #1a202c; padding-top: 5px;">Authorized Signature</span>
            </div>
        </div>
    </div>
</body>
</html>
