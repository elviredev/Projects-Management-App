import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import TasksTable from "@/Pages/Task/TasksTable.jsx";
import SuccessMessage from "@/Components/SuccessMessage.jsx";

export default function Index({ auth, tasks, queryParams = null, success }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mes Tâches</h2>
          <Link
            href={route('task.create')}
            className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Ajouter Tâche
          </Link>
        </div>
      }
    >

      <Head title="Tâches" />

      <div className="py-24 max-w-7xl mx-auto relative">

        <div className="overflow-x-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Message de succès avec délai d'affichage de 3 sec */}
          {success && (
            <SuccessMessage message={success} />
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 ">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                success={success}
              />
            </div>
          </div>
        </div>

      </div>

    </AuthenticatedLayout>
  )
}
