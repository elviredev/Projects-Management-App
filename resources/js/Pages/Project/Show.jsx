import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";
import SuccessMessage from "@/Components/SuccessMessage.jsx";

export default function Show({auth, project, tasks, queryParams, success}) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Projet "${project.name}"`}
          </h2>
          <Link
            href={route('project.edit', project.id)}
            className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Modifier Projet
          </Link>
        </div>
      }
    >
      <Head title={`Projet "${project.name}"`}/>

      {/* Partie Infos Projet */}
      <div className="py-24 max-w-7xl mx-auto relative">
        <div className="overflow-x-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Message de succès avec délai d'affichage de 3 sec */}
          {success && (
            <SuccessMessage message={success} />
          )}
          <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden sm:rounded-lg">
            <div>
              <img
                src={project.image_path}
                alt=""
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-200">
              <div className="grid grid-cols-2 gap-1  mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">ID Projet</label>
                    <p className="mt-1">{project.id}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Nom Projet</label>
                    <p className="mt-1">{project.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Statut Projet</label>
                    <p className="mt-1">
                      <span
                        className={`px-1 py-1 rounded text-white text-nowrap ${PROJECT_STATUS_CLASS_MAP[project.status]}`}
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Créé Par</label>
                    <p className="mt-1">{project.createdBy.name}</p>
                  </div>

                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Date Echéance</label>
                    <p className="mt-1">{project.due_date}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Créé Le</label>
                    <p className="mt-1">{project.created_at}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Mis à jour par</label>
                    <p className="mt-1">{project.updatedBy.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Description Projet</label>
                <p className="mt-1">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partie Tableau Tâches */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-200">
              { tasks.data.length === 0 ? (
                <h1>Il n'y a aucune tâche pour ce projet.</h1>
              ) : (
                <TasksTable
                  tasks={tasks}
                  success={success}
                  queryParams={queryParams}
                  hideProjectColumn={true}
                  project={project}
                />
              )}

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}
