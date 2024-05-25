import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Edit({auth, project}) {

  // variables Inertia pour travailler avec les formualires
  const {data, setData, post, errors, reset} = useForm({
    image: '',
    name: project.name || '',
    status: project.status || '',
    description: project.description || '',
    due_date: project.due_date || '',
    _method: 'PUT'
  })

  const onSubmit = (e) => {
    e.preventDefault()

    post(route('project.update', project.id))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Modifier le projet "{project.name}"
          </h2>
        </div>

      }
    >
      <Head title="Modifier Projet"/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden sm:rounded-lg">

            <form
              onSubmit={onSubmit}
              className="p-6 bg-white dark:bg-gray-800 shadow sm:p-8 sm:rounded-lg"
            >
              {project.image_path && <div className="mb-4">
                <img src={project.image_path} className="w-64" alt={project.name}/>
              </div>}
              {/* Project Image */}
              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Image du Projet"
                />
                <TextInput
                  id="project_image_path"
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

              {/* Project Name */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_name"
                  value="Nom du Projet"
                />
                <TextInput
                  id="project_name"
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

              {/* Project Description */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Description du Projet"
                />
                <TextAreaInput
                  id="project_description"
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
                  htmlFor="project_due_date"
                  value="Deadline du projet"
                />
                <TextInput
                  id="project_due_date"
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

              {/* Projet Statut */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_status"
                  value="Statut du projet"
                />
                <SelectInput
                  id="project_status"
                  name="status"
                  className="mt-1 block w-full"
                  onChange={e => setData('status', e.target.value)}
                  value={data.status}
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

              {/* Boutons */}
              <div className="mt-4 text-right">
                <Link
                  href={route('project.index')}
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
