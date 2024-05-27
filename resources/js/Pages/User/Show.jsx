import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP} from "@/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({auth, user, tasks, queryParams}) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Utilisateur "${user.name}"`}
        </h2>
      }
    >
      <Head title={`Utilisateur "${user.name}"`}/>

      {/* Partie Infos Utilisateur */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden sm:rounded-lg">
            <div>
              <img
                src={user.image_path}
                alt=""
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-200">
              <div className="grid grid-cols-2 gap-1  mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">ID Utilisateur</label>
                    <p className="mt-1">{user.id}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Nom Utilisateur</label>
                    <p className="mt-1">{user.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Statut Utilisateur</label>
                    <p className="mt-1">
                      <span
                        className={`px-1 py-1 rounded text-white text-nowrap ${USER_STATUS_CLASS_MAP[user.status]}`}
                      >
                        {USER_STATUS_TEXT_MAP[user.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Créé Par</label>
                    <p className="mt-1">{user.createdBy.name}</p>
                  </div>

                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Date Echéance</label>
                    <p className="mt-1">{user.due_date}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Créé Le</label>
                    <p className="mt-1">{user.created_at}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Mis à jour par</label>
                    <p className="mt-1">{user.updatedBy.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Description Utilisateur</label>
                <p className="mt-1">{user.description}</p>
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
                <h1>Il n'y a aucune tâche pour ce utilisateur.</h1>
              ) : (
                <TasksTable
                  tasks={tasks}
                  queryParams={queryParams}
                  hideUserColumn={true}
                  user={user}
                />
              )}

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}
