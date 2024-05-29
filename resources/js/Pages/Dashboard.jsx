import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";

export default function Dashboard(
  {
    auth,
    myPendingTasks,
    totalPendingTasks,
    myInProgressTasks,
    totalInProgressTasks,
    myCompletedTasks,
    totalCompletedTasks,
    activeTasks
  }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tableau de bord</h2>}
        >
            <Head title="TdB" />

          <div className="py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <h3 className="text-amber-500 text-xl font-semibold">Tâches en attente</h3>
                  <p className="text-xl mt-3">
                    <span className="mr-2">{myPendingTasks}</span>/
                    <span className="ml-2">{totalPendingTasks}</span>
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <h3 className="text-blue-500 text-xl font-semibold">Tâches en cours</h3>
                  <p className="text-xl mt-3">
                    <span className="mr-2">{myInProgressTasks}</span>/
                    <span className="ml-2">{totalInProgressTasks}</span>
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <h3 className="text-green-500 text-xl font-semibold">Tâches terminées</h3>
                  <p className="text-xl mt-3">
                    <span className="mr-2">{myCompletedTasks}</span>/
                    <span className="ml-2">{totalCompletedTasks}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <h3 className="text-gray-200 text-xl font-semibold">Mes tâches actives</h3>
                  <div className="overflow-auto">
                    <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                      <tr>
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Nom Projet</th>
                        <th className="px-3 py-2">Nom Tâche</th>
                        <th className="px-3 py-2">Statut</th>
                        <th className="px-3 py-2 text-nowrap">Date échéance</th>
                      </tr>
                    </thead>
                    <tbody>
                    {activeTasks.data.map(task => (
                      <tr key={task.id}>
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2 text-white hover:underline">
                          <Link href={route('project.show', task.project.id)}>
                            {task.project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2 text-white text-nowrap hover:underline">
                          <Link href={route('task.show', task.id)}>
                            {task.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={"px-3 py-1 rounded text-white text-nowrap " + TASK_STATUS_CLASS_MAP[task.status]}
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{task.due_date}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthenticatedLayout>
);
}
