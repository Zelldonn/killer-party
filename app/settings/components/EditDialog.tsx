import { useEffect, useState } from "react"

interface EditDialogProps {
    index: number,
    handleEventForm: Function,
    actionDescription: string
}
const EditDialog: React.FC<EditDialogProps> = ({ index, handleEventForm, actionDescription }) => {
    const [action, setAction] = useState<string>()
    useEffect(() => {
        if(actionDescription)
            setAction(actionDescription)
        else
            setAction("Faites en sortes que votre victime")
    }, [actionDescription])
    return (
        <form>
            <div className="sm:col-span-4">
                <div className='flex justify-between items-center'>
                    <label htmlFor="username_" className="block text-sm font-medium leading-6 text-gray-900">
                        Description de l&apos;action
                    </label>
                </div>
                <button
                    onClick={(e) => {e.preventDefault(); handleEventForm("quit") }}
                    className="absolute top-2 right-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 "
                >
                    X
                </button>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <textarea
                            name="action"
                            id="action"
                            value={action}
                            autoFocus
                            rows={6}
                            onChange={(e) => { setAction(e.target.value) }}
                            required
                            autoComplete="action"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                    </div>

                </div>

            </div>

            <div className='flex justify-between mt-10'>
                <button
                    type="submit"
                    className="flex justify-end rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e) => {e.preventDefault(); handleEventForm("update", action) }}
                >
                    Ajouter l&apos;action
                </button>
                <button
                    type="submit"
                    className="flex justify-end px-3 py-1.5 text-sm font-semibold leading-6 text-black "
                    onClick={(e) => {e.preventDefault(); handleEventForm("delete") }}
                >
                    Supprimer
                </button>
            </div>
        </form>
    )
}
export default EditDialog