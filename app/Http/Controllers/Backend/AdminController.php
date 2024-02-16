<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $admin = new Admin();
        $admin->name = $request->name;
        $admin->username = $request->username;
        $admin->email = $request->email;
        $admin->password = Hash::make($request->password);
        if($admin->save()){
            return Response()->json([
                'status'        => 200,
                'message'       => 'Admin Registration Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 402,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }


    }

    public function countAdmin(){
        $admin = Admin::all();
        if($admin->count() > 0){
            return Response()->json([
                'status'    => 200,
                'redirect'  => true
            ]);
        }else{
            return Response()->json([
                'status'    => 200,
                'redirect'  => false
            ]);
        }
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'username'  => 'required',
            'password'  => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $attempt = Auth::guard('admin')->attempt(['username' => $request->username,'password'=>$request->password]);
        // $admin_api = Auth::guard('admin')->check()->createToken
        $admin = Admin::where('username',$request->username)->get()->first();
        if($admin){
            if(Hash::check($request->password, $admin->password)){
                $token = $admin->createToken($admin->email)->plainTextToken;
                return Response()->json([
                    'status'            => 200,
                    'authorization'     => $attempt,
                    'rh_token'          => $token
                ]);
            }else{
                return Response()->json([
                    'status'    => 402,
                    'message'   => 'Username and Password not mached.'
                ]);
            }
        }else{
            return Response()->json([
                'status'    => 402,
                'message'   => 'Username and Password not mached.'
            ]);
        }
        

    }
}
