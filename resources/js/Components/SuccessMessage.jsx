import {useState, useEffect} from 'react'

/**
 * Gère le délai d'affichage du message de succès dans le navigateur
 * @param {string} message
 */
export default function SuccessMessage ({message}) {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Si le message est défini, lancer le timeout
    if (message) {
      setVisible(true); // Reset visibility when message changes

      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000) // Le message disparaît après 3 sec

      // Nettoyer le timeout si le composant est démonté ou si le message change
      return () => clearTimeout(timer)
    }
  }, [message]);

  if (!visible) return null

  return (
    <div className="absolute max-w-7xl right-8 top-4 bg-gray-800 border-2 border-emerald-500/75 py-4 px-4 text-gray-200 rounded">
      {message}
    </div>
  )

}
