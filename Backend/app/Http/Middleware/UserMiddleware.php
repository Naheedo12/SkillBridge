<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Non authentifié. Veuillez vous connecter.'
            ], 401);
        }

        if (!$request->user()->isUtilisateur() && !$request->user()->isAdministrateur()) {
            return response()->json([
                'success' => false,
                'message' => 'Accès refusé. Droits utilisateur requis.'
            ], 403);
        }

        return $next($request);
    }
}