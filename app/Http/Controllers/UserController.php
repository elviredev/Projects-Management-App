<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCrudResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        /**
         * Sorting Users
         */
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        /**
         * Search by name & email
         */
        if (request("name")) {
            $query->where('name', 'like', '%' . request("name") . '%');
        }

        if (request("email")) {
            $query->where('email', 'like', '%' . request("email") . '%');
        }

        /**
         * Pagination avec conservation des paramètres entre les pages
         */
        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->onEachSide(1);

        return inertia('User/Index', [
            'users' => UserCrudResource::collection($users),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $data['email_verified_at'] = time();

        $data['password'] = bcrypt($data['password']);

        User::create($data);

        return to_route('user.index')
            ->with('success', 'L\'utilisateur a bien été créé 👏🏼');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        $password = $data['password'] ?? null;
        // si le mdp est modifié par l'utilisateur, on le chiffre en bdd
        if ($password) {
            $data['password'] = bcrypt($password);
        } else { // sinon, on ne le définit pas
            unset($data['password']);
        }

        $user->update($data);

        return to_route('user.index')
            ->with('success', "L'utilisateur $user->name a bien été modifié 🙂");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = htmlspecialchars($user->name, ENT_QUOTES, 'UTF-8');

        $user->delete();

        return to_route('user.index')
            ->with('success', "L'utilisateur $name a bien été supprimé 👍🏼");
    }
}
