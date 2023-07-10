import { useEffect, useState } from "react"

interface EditFormProps {
    index: number,
    handleEventForm: Function,
    playerName: string
}
const EditForm: React.FC<EditFormProps> = ({ index, handleEventForm, playerName }) => {
    const [name, setName] = useState<string>("")
    useEffect(() => {
        setName(playerName)
        console.log(playerName)
    }, [name])
    return (
        <form>
            <div className="sm:col-span-4">
                <div className='flex justify-between items-center'>
                    <label htmlFor="username_" className="block text-sm font-medium leading-6 text-gray-900">
                        Nom du joueur
                    </label>
                </div>
                <button
                    onClick={() => { handleEventForm("quit") }}
                    className="absolute top-2 right-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 "
                >
                    X
                </button>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                            type="text"
                            name="username_"
                            id="username"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            required
                            autoComplete="username"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                    </div>

                </div>

            </div>

            <div className='flex justify-between mt-10'>
                <button
                    type="submit"
                    className="flex justify-end rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sauvegarder
                </button>
                <button
                    type="submit"
                    className="flex justify-end px-3 py-1.5 text-sm font-semibold leading-6 text-black "
                >
                    Supprimer
                </button>
            </div>
        </form>
    )
}
