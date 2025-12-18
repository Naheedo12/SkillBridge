<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Créer un utilisateur normal
        $this->user = User::create([
            'nom' => 'User',
            'prenom' => 'Normal',
            'email' => 'user@example.com',
            'motDePasse' => Hash::make('password123'),
            'role' => 'Utilisateur',
            'solde_credits' => 10,
        ]);

        // Créer un administrateur
        $this->admin = User::create([
            'nom' => 'Admin',
            'prenom' => 'Super',
            'email' => 'admin@example.com',
            'motDePasse' => Hash::make('admin123'),
            'role' => 'Administrateur',
            'solde_credits' => 100,
        ]);

        // Créer quelques utilisateurs supplémentaires pour les tests admin
        User::factory()->count(3)->create();
    }

    /** @test */
    public function admin_can_access_admin_routes()
    {
        $token = $this->admin->createToken('admin-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/admin/users');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'data' => [
                            '*' => [
                                'id', 'nom', 'prenom', 'email', 'role'
                            ]
                        ]
                    ]
                ]);
    }

    /** @test */
    public function regular_user_cannot_access_admin_routes()
    {
        $token = $this->user->createToken('user-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/admin/users');

        $response->assertStatus(403)
                ->assertJson([
                    'success' => false,
                    'message' => 'Accès refusé. Droits administrateur requis.'
                ]);
    }

    /** @test */
    public function admin_can_view_specific_user()
    {
        $token = $this->admin->createToken('admin-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/admin/users/' . $this->user->id);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'user' => [
                            'id' => $this->user->id,
                            'email' => $this->user->email,
                            'role' => 'Utilisateur'
                        ]
                    ]
                ]);
    }

    /** @test */
    public function admin_can_delete_user()
    {
        $token = $this->admin->createToken('admin-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/admin/users/' . $this->user->id);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Utilisateur supprimé avec succès'
                ]);

        $this->assertDatabaseMissing('users', [
            'id' => $this->user->id
        ]);
    }
}