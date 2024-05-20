import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Index({ auth, projects }) {

  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
    >

    </AuthenticatedLayout>

  )
}
