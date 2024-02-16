<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;

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

    public function send_reset_link(Request $request){
        $validator = Validator::make($request->all(),[
            'email'     => 'required|email|exists:admins'
        ],[
            'email.exists'  => 'Email Address not exists.'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }
        $token = Str::random(64);
        // $now = Carbon::now();

        // $currentData = $now;
        // $check = Carbon::parse($currentData)->addMinute(30)->isFuture();

        // $add_token = DB::table('password_reset_tokens')->insert([
        //     'email'     => $request->email,
        //     'token'     => $token,
        //     'created_at'=> Carbon::now()
        // ]);

        // Mail::send('email.reset-password.reset',['token'=>$token],function($message) use($request){
        //     $message->to($request->email);
        //     $message->subject('Reset Password');
        // });

        $data = DB::table('password_reset_tokens')->where('email',$request->email)->get()->first();

        $time = 45;

        $check = Carbon::parse($data->created_at)->addMinute($time)->isFuture();

        return Response()->json($check);

        // return Response()->json([
        //     'status'    => 200,
        //     'message'   => 'Email send successfully'
        // ]);

    }
}
