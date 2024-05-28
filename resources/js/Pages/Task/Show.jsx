import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP} from "@/constants.jsx";

export default function Show({auth, task}) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Tâche "${task.name}"`}
        </h2>
      }
    >
      <Head title={`Tâche "${task.name}"`}/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden sm:rounded-lg">
            <div>
              <img
                src={task.image_path}
                alt=""
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-200">
              <div className="grid grid-cols-2 gap-1  mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">ID Tâche</label>
                    <p className="mt-1">{task.id}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Nom Tâche</label>
                    <p className="mt-1">{task.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Statut Tâche</label>
                    <p className="mt-1">
                      <span
                        className={`px-1 py-1 rounded text-white text-nowrap ${TASK_STATUS_CLASS_MAP[task.status]}`}
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Priorité Tâche</label>
                    <p className="mt-1">
                      <span
                        className={`px-1 py-1 rounded text-white text-nowrap ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Créé Par</label>
                    <p className="mt-1">{task.createdBy.name}</p>
                  </div>

                </div>

                <div>
                  <div>
                    <label className="font-bold text-lg">Date Echéance</label>
                    <p className="mt-1">{task.due_date}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Créé Le</label>
                    <p className="mt-1">{task.created_at}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Projet</label>
                    <p className="mt-1 hover:underline text-indigo-300">
                      <Link href={route('project.show', task.project.id)}>
                        {task.project.name}
                      </Link>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Affecté à l'utilisateur</label>
                    <p className="mt-1">{task.assignedUser.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Description Tâche</label>
                <p className="mt-1">{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}
