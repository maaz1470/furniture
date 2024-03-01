<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class AdminGuardMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (Auth::guard('admin')->check()) {
            return $next($request);
        } else {
            if ($request->ajax()) {
                return Response()->json([
                    'status'    => 401,
                    'message'   => 'Unauthenticated'
                ]);
            } else {
                return redirect()->route('admin.login');
            }
        }
    }
}
