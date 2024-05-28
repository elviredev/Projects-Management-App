import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Edit({auth, task, projects, users}) {

  // variables Inertia pour travailler avec les formualires
  const {data, setData, post, errors} = useForm({
    image: '',
    name: task.name || '',
    status: task.status || '',
    description: task.description || '',
    due_date: task.due_date || '',
    project_id: task.project_id || '',
    assigned_user_id: task.assigned_user_id || '',
    priority: task.priority || '',
    _method: 'PUT'
  })

  const onSubmit = (e) => {
    e.preventDefault()

    post(route('task.update', task.id))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Modifier le tâche "{task.name}"
          </h2>
        </div>

      }
    >
      <Head title="Modifier Tâche"/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden sm:rounded-lg">

            <form
              onSubmit={onSubmit}
              className="p-6 bg-white dark:bg-gray-800 shadow sm:p-8 sm:rounded-lg"
            >
              {task.image_path && <div className="mb-4">
                <img src={task.image_path} className="w-64" alt={task.name}/>
              </div>}
              {/* Projet ID contenant cette tâche */}
              <div>
                <InputLabel
                  htmlFor="task_project_id"
                  value="Projet concerné"
                />
                <SelectInput
                  id="task_project_id"
                  name="project_id"
                  value={data.project_id}
                  className="mt-1 block w-full"
                  onChange={e => setData('project_id', e.target.value)}
                >
                  <option value="">Choisir un Projet</option>
                  {projects.data.map(project => (
                    <option
                      value={project.id}
                      key={project.id}
                    >
                      {project.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError
                  message={errors.project_id}
                  className="mt-2"
                />
              </div>

              {/* Task Image */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_image_path"
                  value="Image de la Tâche"
                />
                <TextInput
                  id="task_image_path"
                  name="image"
                  type="file"
                  className="mt-1 block w-full"
                  onChange={e => setData('image', e.target.files[0])}
                />
                <InputError
                  message={errors.image}
                  className="mt-2"
                />
              </div>

              {/* Task Name */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_name"
                  value="Nom de la Tâche"
                />
                <TextInput
                  id="task_name"
                  name="name"
                  type="text"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={e => setData('name', e.target.value)}
                />
                <InputError
                  message={errors.name}
                  className="mt-2"
                />
              </div>

              {/* Task Description */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_description"
                  value="Description de la Tâche"
                />
                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={e => setData('description', e.target.value)}
                />
                <InputError
                  message={errors.description}
                  className="mt-2"
                />
              </div>

              {/* Date d'échéance */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_due_date"
                  value="Deadline de la tâche"
                />
                <TextInput
                  id="task_due_date"
                  name="due_date"
                  type="date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={e => setData('due_date', e.target.value)}
                />
                <InputError
                  message={errors.due_date}
                  className="mt-2"
                />
              </div>

              {/* Tâche Statut */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_status"
                  value="Statut de la tâche"
                />
                <SelectInput
                  id="task_status"
                  name="status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={e => setData('status', e.target.value)}
                >
                  <option value="">Choisir un Statut</option>
                  <option value="pending">En Attente</option>
                  <option value="in_progress">En Cours</option>
                  <option value="completed">Terminé</option>
                </SelectInput>
                <InputError
                  message={errors.status}
                  className="mt-2"
                />
              </div>

              {/* Tâche Priorité */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_priority"
                  value="Priorité de la tâche"
                />
                <SelectInput
                  id="task_priority"
                  name="priority"
                  value={data.priority}
                  className="mt-1 block w-full"
                  onChange={e => setData('priority', e.target.value)}
                >
                  <option value="">Choisir une Priorité</option>
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">haute</option>
                </SelectInput>
                <InputError
                  message={errors.priority}
                  className="mt-2"
                />
              </div>

              {/* Utilisateur affecté à la Tâche */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_assigned_user"
                  value="Utilisateur affecté à la tâche"
                />
                <SelectInput
                  id="task_assigned_user"
                  name="assigned_user_id"
                  value={data.assigned_user_id}
                  className="mt-1 block w-full"
                  onChange={e => setData('assigned_user_id', e.target.value)}
                >
                  <option value="">Choisir un Utilisateur</option>
                  {users.data.map(user => (
                    <option
                      value={user.id}
                      key={user.id}
                    >
                      {user.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>

              {/* Boutons */}
              <div className="mt-4 text-right">
                <Link
                  href={route('task.index')}
                  className="inline-block bg-gray-100 px-3 py-1 h-8 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Annuler
                </Link>
                <button className="bg-emerald-500 px-3 py-1 h-8 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Valider
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}
