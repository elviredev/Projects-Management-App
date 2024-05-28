<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Enregistrer l'URL actuelle
        session(['url.intended' => url()->current()]);

        $query = Task::query();

        /**
         * Sorting Tasks
         */
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        /**
         * Search by name & status
         */
        if (request("name")) {
            $query->where('name', 'like', '%' . request("name") . '%');
        }

        if (request("status")) {
            $query->where('status', request("status"));
        }

        /**
         * Pagination
         */
        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->onEachSide(1);

        return inertia('Task/Index', [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();

        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        /** @var $image UploadedFile */
        $image = $data['image'] ?? null;

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('task/'.Str::random(), ['disk' => 'public']);
        }

        Task::create($data);

        return to_route('task.index')
            ->with('success', 'La tâche a bien été créée 👏🏼');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            "task" => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();

        // Stocker l'URL actuelle dans la session avant de rediriger vers le formulaire d'édition
        session(['url.intended' => url()->previous()]);

        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        /** @var $image UploadedFile */
        $image = $data['image'] ?? null;

        $data['updated_by'] = Auth::id();

        if ($image) {
            if ($task->image_path) {
                // Supprimer image et dossier la contenant
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }

            $data['image_path'] = $image->store('task/'.Str::random(), ['disk' => 'public']);
        }

        $task->update($data);

        // Rediriger vers l'URL stockée dans la session
        return redirect(session('url.intended', route('task.index')))
            ->with('success', "La tâche \"$task->name\" a bien été modifiée 🙂");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = htmlspecialchars($task->name, ENT_QUOTES, 'UTF-8');

        if ($task->image_path) {
            // Supprimer l'image et le dossier associé
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }

        $task->delete();

        // Vérifier si une URL de provenance est enregistrée dans la session
        $intendedUrl = session('url.intended', route('task.index'));

        // Effacer l'URL de provenance après redirection pour éviter une redirection incorrecte future
        session()->forget('url.intended');

        // Rediriger vers l'URL enregistrée avec le message de succès
        return redirect($intendedUrl)
            ->with('success', "La tâche \"$name\" a bien été supprimée 👍🏼");
    }

    /**
     * Show the tasks of user authenticated
     */
    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        /**
         * Sorting Tasks
         */
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        /**
         * Search by name & status
         */
        if (request("name")) {
            $query->where('name', 'like', '%' . request("name") . '%');
        }

        if (request("status")) {
            $query->where('status', request("status"));
        }

        /**
         * Pagination
         */
        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->onEachSide(1);

        return inertia('Task/Index', [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }
}
