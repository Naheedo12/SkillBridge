<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Créer un utilisateur de test
        $this->user = User::create([
            'nom' => 'Test',
            'prenom' => 'User',
            'email' => 'test@example.com',
            'motDePasse' => Hash::make('password123'),
            'role' => 'Utilisateur',
            'solde_credits' => 10,
        ]);

        // Créer un admin de test
        $this->admin = User::create([
            'nom' => 'Admin',
            'prenom' => 'Test',
            'email' => 'admin@example.com',
            'motDePasse' => Hash::make('admin123'),
            'role' => 'Administrateur',
            'solde_credits' => 100,
        ]);
    }

    /** @test */
    public function user_can_register_successfully()
    {
        $userData = [
            'nom' => 'Nouveau',
            'prenom' => 'Utilisateur',
            'email' => 'nouveau@example.com',
            'motDePasse' => 'password123',
            'motDePasse_confirmation' => 'password123',
            'bio' => 'Test bio'
        ];

        $response = $this->postJson('/api/auth/register', $userData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'user' => [
                            'id', 'nom', 'prenom', 'email', 'role', 'solde_credits'
                        ],
                        'token',
                        'token_type'
                    ]
                ])
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'user' => [
                            'email' => 'nouveau@example.com',
                            'role' => 'Utilisateur',
                            'solde_credits' => 10
                        ]
                    ]
                ]);

        $this->assertDatabaseHas('users', [
            'email' => 'nouveau@example.com',
            'role' => 'Utilisateur'
        ]);
    }

    /** @test */
    public function user_can_login_with_valid_credentials()
    {
        $loginData = [
            'email' => 'test@example.com',
            'motDePasse' => 'password123'
        ];

        $response = $this->postJson('/api/auth/login', $loginData);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'user' => [
                            'id', 'nom', 'prenom', 'email', 'role'
                        ],
                        'token',
                        'token_type'
                    ]
                ])
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'user' => [
                            'email' => 'test@example.com'
                        ]
                    ]
                ]);
    }

    /** @test */
    public function user_cannot_login_with_invalid_credentials()
    {
        $invalidData = [
            'email' => 'test@example.com',
            'motDePasse' => 'wrong-password'
        ];

        $response = $this->postJson('/api/auth/login', $invalidData);

        $response->assertStatus(422)
                ->assertJson(['success' => false]);
    }

    /** @test */
    public function authenticated_user_can_get_profile()
    {
        $token = $this->user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/auth/me');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'user' => [
                            'id' => $this->user->id,
                            'email' => $this->user->email
                        ]
                    ]
                ]);
    }

    /** @test */
    public function unauthenticated_user_cannot_get_profile()
    {
        $response = $this->getJson('/api/auth/me');

        $response->assertStatus(401);
    }

    /** @test */
    public function authenticated_user_can_update_profile()
    {
        $token = $this->user->createToken('test-token')->plainTextToken;

        $updateData = [
            'nom' => 'Nouveau Nom',
            'prenom' => 'Nouveau Prénom',
            'bio' => 'Nouvelle bio'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/auth/profile', $updateData);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'user' => [
                            'nom' => 'Nouveau Nom',
                            'prenom' => 'Nouveau Prénom',
                            'bio' => 'Nouvelle bio'
                        ]
                    ]
                ]);

        $this->assertDatabaseHas('users', [
            'id' => $this->user->id,
            'nom' => 'Nouveau Nom',
            'prenom' => 'Nouveau Prénom'
        ]);
    }

    /** @test */
    public function authenticated_user_can_logout()
    {
        $token = $this->user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/auth/logout');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Déconnexion réussie'
                ]);

        // Vérifier que le token a été supprimé
        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $this->user->id,
            'name' => 'test-token'
        ]);
    }
}