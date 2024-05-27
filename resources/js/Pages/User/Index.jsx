import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";
import SuccessMessage from "@/Components/SuccessMessage.jsx";

export default function Index({ auth, users, queryParams = null, success }) {

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

    router.get(route('user.index'), queryParams)
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

    router.get(route('user.index'), queryParams)
  }

  /**
   * Supprimer un utilisateur
   * @param user
   */
  const deleteUser = (user) => {
    if (!window.confirm("Souhaitez-vous vraiment supprimer cet utilisateur ❌ ?")) {
      return;
    }

    router.delete(route('user.destroy', user.id))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Mes Utilisateurs
          </h2>
          <Link
            href={route('user.create')}
            className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Ajouter Utilisateur
          </Link>
        </div>

      }
    >

      <Head title="Utilisateurs"/>

      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Message de succès avec délai d'affichage de 3 sec */}
          {success && (
              <SuccessMessage message={success} />
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 overflow-hidden">

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
                  <TableHeading
                    name="name"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortChanged={sortChanged}
                  >nom</TableHeading>
                  <TableHeading
                    name="email"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortChanged={sortChanged}
                  >email</TableHeading>
                  <TableHeading
                    name="created_at"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortChanged={sortChanged}
                  >date création</TableHeading>
                  <th className="px-3 py-3 text-right">Actions</th>
                </tr>
                </thead>
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                <tr className="text-nowrap">
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3">
                    <TextInput
                      className="w-full text-sm"
                      placeholder="Nom Utilisateur"
                      defaultValue={queryParams.name}
                      onBlur={(e) => searchFieldChanged('name', e.target.value)}
                      onKeyPress={(e) => onKeyPress('name', e)}
                    />
                  </th>
                  <th className="px-3 py-3">
                    <TextInput
                      className="w-full text-sm"
                      placeholder="Email Utilisateur"
                      defaultValue={queryParams.email}
                      onBlur={(e) => searchFieldChanged('email', e.target.value)}
                      onKeyPress={(e) => onKeyPress('email', e)}
                    />
                  </th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                </tr>
                </thead>
                <tbody>

                {users.data.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-3 py-2">{user.id}</td>
                    <th className="px-3 py-2 text-gray-50 text-nowrap">{user.name}</th>
                    <td className="px-3 py-2">{user.email}</td>
                    <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                    <td className="px-3 py-2 text-nowrap text-right">
                      <Link
                        href={route('user.edit', user.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                      >
                        Modif.
                      </Link>
                      <button
                        onClick={() => deleteUser(user)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                      >Suppr.</button>
                    </td>
                  </tr>
                ))}

                </tbody>
              </table>

              <Pagination links={users.meta.links}/>

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>

  )
}
