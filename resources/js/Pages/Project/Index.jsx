import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Index({ auth, projects, queryParams = null }) {

  queryParams = queryParams || {}

  /**
   * Fonction générique appelée sur les Event Listener : onChange, onBlur, onKeyPress
   * @param {string} name
   * @param {string} value
   */
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('project.index'), queryParams)
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

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projets</h2>}
    >

      <Head title="Projets" />

      <div className="py-12 flex flex-col">
        <div className="overflow-x-auto w-full mx-auto sm:px-6 lg:px-8">
          <div className="inline-block bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg lg:flex lg:flex-col">
            <div className="p-6 text-gray-900 dark:text-gray-100 overflow-hidden">

              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                <tr className="text-nowrap">
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Image</th>
                  <th className="px-3 py-3">Nom</th>
                  <th className="px-3 py-3">Statut</th>
                  <th className="px-3 py-3">Date Création</th>
                  <th className="px-3 py-3">Date Echéance</th>
                  <th className="px-3 py-3">Créé par</th>
                  <th className="px-3 py-3 text-right">Actions</th>
                </tr>
                </thead>
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                <tr className="text-nowrap">
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3">
                    <TextInput
                      className="w-full text-sm"
                      placeholder="Nom du projet"
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

                {projects.data.map((project) => (
                  <tr
                    key={project.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-3 py-2">{project.id}</td>
                    <td className="px-3 py-2">
                      <img src={project.image_path} style={{width: 60}} alt={project.name}/>
                    </td>
                    <td className="px-3 py-2">{project.name}</td>
                    <td className="px-3 py-2">
                        <span
                          className={
                            "px-1 py-1 rounded text-white text-nowrap " +
                            PROJECT_STATUS_CLASS_MAP[project.status]
                          }
                        >
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                    </td>
                    <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                    <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                    <td className="px-3 py-2">{project.createdBy.name}</td>
                    <td className="px-3 py-2">
                      <Link
                        href={route('project.edit', project.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                      >
                        Modif.
                      </Link>
                      <Link
                        href={route('project.destroy', project.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                      >
                        Suppr.
                      </Link>
                    </td>
                  </tr>
                ))}

                </tbody>
              </table>

              <Pagination links={projects.meta.links}/>

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>

  )
}
