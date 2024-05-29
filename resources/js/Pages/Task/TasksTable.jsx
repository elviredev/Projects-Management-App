import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({tasks, project, queryParams = null, hideProjectColumn = false}) {

  queryParams = queryParams || {}

  /**
   * Fonction générique appelée sur les Event Listener : onChange, onBlur, onKeyPress
   * @param {string} name
   * @param {string} value
   */
  const searchFieldChanged = (name, value) => {
    // Met à jour les query params en fonction de la présence de la valeur
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    // Vérifie et appelle la route 'task.index' si elle existe
    if (route().current('task.index')) {
      router.get(route('task.index'), queryParams)
      return;
    }

    // Vérifie et appelle la route 'task.myTasks' si elle existe
    if (route().current('task.myTasks')) {
      router.get(route('task.myTasks'), queryParams)
      return;
    }

    // Vérifie que 'project' est défini et appelle la route 'project.show' si elle existe
    if (project && project.id && route().current('project.show', {project: project.id})) {
      router.get(route('project.show', {project: project.id}), queryParams)
    }

  }

  /**
   * Fonction qui sera appelée une fois que la touche "Enter" sera enfoncée à partir du clavier.
   * @param {string} name
   * @param e
   */
  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value)
  }

  /**
   * Fonction de tri des entêtes du tableau
   * @param {string} name
   */
  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc'
      } else {
        queryParams.sort_direction = 'asc'
      }
    } else {
      queryParams.sort_field = name
      queryParams.sort_direction = 'asc'
    }

    // Vérifie et appelle la route 'task.index' si elle existe
    if (route().current('task.index')) {
      router.get(route('task.index'), queryParams)
      return;
    }

    // Vérifie et appelle la route 'task.myTasks' si elle existe
    if (route().current('task.myTasks')) {
      router.get(route('task.myTasks'), queryParams)
      return;
    }

    // Vérifie que 'project' est défini et appelle la route 'project.show' si elle existe
    if (project && project.id && route().current('project.show', {project: project.id})) {
      router.get(route('project.show', {project: project.id}), queryParams)
    }
  }

  /**
   * Supprimer une tâche
   * @param task
   */
  const deleteTask = (task) => {
    if (!window.confirm("Souhaitez-vous vraiment supprimer cette tâche ❌ ?")) {
      return;
    }

    router.delete(route('task.destroy', task.id))
  }

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <TableHeading
              name="id"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >id</TableHeading>
            <th className="px-3 py-3">Image</th>
            {!hideProjectColumn && <th className="px-3 py-3">Projet</th>}
            <TableHeading
              name="name"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >name</TableHeading>
            <TableHeading
              name="status"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >statut</TableHeading>
            <TableHeading
              name="created_at"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >date création</TableHeading>
            <TableHeading
              name="due_date"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >date echéance</TableHeading>
            <th className="px-3 py-3">Créé par</th>
            <th className="px-3 py-3 text-right">Actions</th>
          </tr>
          </thead>
          <thead
            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            {!hideProjectColumn && <th className="px-3 py-3"></th>}
            <th className="px-3 py-3">
              <TextInput
                className="w-full text-sm"
                placeholder="Nom de la tâche"
                defaultValue={queryParams.name}
                onBlur={(e) => searchFieldChanged('name', e.target.value)}
                onKeyPress={(e) => onKeyPress('name', e)}
              />
            </th>
            <th className="px-3 py-3">
              <SelectInput
                className="w-full text-sm"
                defaultValue={queryParams.status}
                onChange={(e) => searchFieldChanged('status', e.target.value)}
              >
                <option value="">Select Statut</option>
                <option value="pending">En Attente</option>
                <option value="in_progress">En Cours</option>
                <option value="completed">Terminé</option>
              </SelectInput>
            </th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
          </tr>
          </thead>
          <tbody>

          {tasks.data.map((task) => (
            <tr
              key={task.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-3 py-2">{task.id}</td>
              <td className="px-3 py-2">
                <img src={task.image_path} style={{width: 60}} alt={task.name}/>
              </td>
              {!hideProjectColumn &&
                <td className="px-3 py-2 text-nowrap">
                  {`${task.project.name.slice(0,12)}...`}
                </td>
              }
              <th className="px-3 py-2 text-gray-100 hover:underline">
                <Link href={route("task.show", task.id)}>
                  {task.name}
                </Link>
              </th>
              <td className="px-3 py-2">
                <span
                  className={
                    "px-3 py-1 rounded text-white text-nowrap " +
                    TASK_STATUS_CLASS_MAP[task.status]
                  }
                >
                  {TASK_STATUS_TEXT_MAP[task.status]}
                </span>
              </td>
              <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
              <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
              <td className="px-3 py-2">{task.createdBy.name}</td>
              <td className="px-3 py-2 text-nowrap">
                <Link
                  href={route('task.edit', task.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                >
                  Modif.
                </Link>
                <button
                  onClick={() => deleteTask(task)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                >
                  Suppr.
                </button>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links}/>
    </>
  )
}
