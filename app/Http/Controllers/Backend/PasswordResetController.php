<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PasswordResetController extends Controller
{
    public function forgate_page()
    {
        return view('Backend.Layout');
    }

    public function token()
    {
        return view('Backend.Layout');
    }

}
