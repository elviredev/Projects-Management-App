<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Database\QueryException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        /**
         * Sorting Projects
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
         * Pagination avec conservation des paramètres entre les pages
         */
        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->onEachSide(1);

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        /** @var $image UploadedFile */
        $image = $data['image'] ?? null;

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('project/'.Str::random(), ['disk' => 'public']);
        }

        Project::create($data);

        return to_route('project.index')
            ->with('success', 'Le projet a bien été créé 👏🏼');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // Enregistrer l'URL précédente
        session(['url.intended' => url()->current()]);

        $query = $project->tasks();

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


        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->onEachSide(1);

        return inertia('Project/Show', [
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        /** @var $image UploadedFile */
        $image = $data['image'] ?? null;

        $data['updated_by'] = Auth::id();

        if ($image) {
            if ($project->image_path) {
                // Supprimer image et dossier la contenant
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }

            $data['image_path'] = $image->store('project/'.Str::random(), ['disk' => 'public']);
        }

        $project->update($data);

        return to_route('project.index')
            ->with('success', "Le projet \"$project->name\" a bien été modifié 🙂");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = htmlspecialchars($project->name, ENT_QUOTES, 'UTF-8');

        // Utiliser une transaction pour s'assurer que toutes les opérations sont effectuées ou aucune
        DB::beginTransaction();
        try {
            // Supprimer les tâches associées au projet
            $project->tasks()->delete();

            // Supprimer l'image associée si elle existe
            if ($project->image_path) {
                // Supprimer l'image
                Storage::disk('public')->delete($project->image_path);
                // Récupérer le chemin du dossier contenant l'image
                $folderPath = dirname($project->image_path);
                // Supprimer le répertoire s'il est vide
                if (Storage::disk('public')->exists($folderPath) && count(Storage::disk('public')->allFiles($folderPath)) === 0) {
                    // Supprimer le répertoire
                    Storage::disk('public')->deleteDirectory($folderPath);
                }
            }

            // Supprimer le projet
            $project->delete();

            // Confirmer la transaction
            DB::commit();

            return to_route('project.index')
                ->with('success', "Le projet \"$name\" a bien été supprimé 👍🏼");

        } catch (QueryException $e) {
            // Annuler la transaction en cas d'erreur
            DB::rollBack();

            // Rediriger vers une page d'erreur avec un message approprié
            return to_route('project.index')
                ->with('error', "Une erreur est survenue lors de la suppression du projet \"$name\". Assurez-vous que toutes les tâches associées sont supprimées.");
        }
    }

}
