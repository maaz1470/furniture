<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AdminController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'  => 'required|string|max:255',
            'username'  => 'required|string|max:255|unique:admins,username',
            'email'     => 'required|email|max:255|unique:admins,email',
            'password'  => ['required','same:confirm_password',Password::min(8)->mixedCase()->numbers()->symbols()->uncompromised()],
            'confirm_password'  => ['required', 'same:password',Password::min(8)->mixedCase()->numbers()->symbols()->uncompromised()]
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 200,
                'errors'   => $validator->errors()->all()
            ]);
        }
    }
}
