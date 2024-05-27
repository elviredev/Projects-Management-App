import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth}) {

  // variables Inertia pour travailler avec les formualires
  const {data, setData, post, errors, reset} = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()

    post(route('user.store'))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Créer un nouveau utilisateur
          </h2>
        </div>

      }
    >
      <Head title="Créer Utilisateur"/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden sm:rounded-lg">

            <form
              onSubmit={onSubmit}
              className="p-6 bg-white dark:bg-gray-800 shadow sm:p-8 sm:rounded-lg"
            >
              {/* User Name */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_name"
                  value="Nom Utilisateur"
                />
                <TextInput
                  id="user_name"
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

              {/* User Email */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_email"
                  value="Email Utilisateur"
                />
                <TextInput
                  id="user_email"
                  name="email"
                  type="text"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={e => setData('email', e.target.value)}
                />
                <InputError
                  message={errors.email}
                  className="mt-2"
                />
              </div>

              {/* User Password */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password"
                  value="MdP Utilisateur"
                />
                <TextInput
                  id="user_password"
                  name="password"
                  type="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  onChange={e => setData('password', e.target.value)}
                />
                <InputError
                  message={errors.password}
                  className="mt-2"
                />
              </div>

              {/* User Password Confirmation */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmation"
                  value="Confirmer MdP"
                />
                <TextInput
                  id="user_password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  onChange={e => setData('password_confirmation', e.target.value)}
                />
                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>

              {/* Boutons */}
              <div className="mt-4 text-right">
                <Link
                  href={route('user.index')}
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
