'use client'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import ActionList from './components/ActionList';
import { Action } from '../killer-game/types';
import { useState } from 'react';
import EditDialog from './components/EditDialog';
export default function Settings() {
    const router = useRouter()
    const loadActionFromLocalStorage = (key: string): Action[] => {
        if (typeof window !== 'undefined') {
            const string = localStorage.getItem(key)!
            if (string === null) {
                return []
            }
            const actions: Action[] = JSON.parse(string)
            return actions
        }
        return []
    }

    const [actions, setActions] = useState<Action[]>(loadActionFromLocalStorage("actions"))
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(-1)
    const [action, setAction] = useState<Action>({ description: "" })

    const handleActionClick = (index: number) => {
        setIndex(index)
        setOpen(true)
    }

    const saveToLocalStorage = (key: string, value: string) => {
        localStorage.setItem(key, value)
    }

    const handleEventForm = (type: string, description?: string) => {
        if (type === "exit")
            setOpen(false)
        if (type === "delete") {
            let updatedActions = actions.filter((action, i) =>
                i !== index)

            setActions(updatedActions)
            saveToLocalStorage('actions', JSON.stringify(updatedActions))
            setOpen(false)
        }
        if (type === "update") {
            if (!description)
                return
            actions[index] = { description }
            saveToLocalStorage('actions', JSON.stringify(actions))
            setOpen(false)
        }
        setIndex(-1)
        setOpen(false)
    }

    return (<main className="flex min-h-screen  flex-col items-center justify-between p-10">
        <ArrowBackIcon onClick={() => { router.push('/') }} className='absolute top-7 left-7 fill-gray-600' />
        <form className="w-full mt-7" onSubmit={(e) => { e.preventDefault(); setActions([...actions, action]); saveToLocalStorage('actions', JSON.stringify([...actions, action])); setAction({ description: "" }) }}>
            <div className="sm:col-span-4 ">
                <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900 dark:text-slate-50">
                    Description de l&apos;action
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md text-md shadow-sm h-28 ring-1 ring-inset ring-gray-300 focus-within:ring-2  focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <textarea
                            name="action"
                            id="Description"
                            rows={5}
                            value={action.description}
                            onChange={(e) => { setAction({ description: e.target.value }) }}
                            required
                            autoComplete="username"
                            className="block align-top flex-1 border-0 text-start bg-transparent py-1.5 pl-1 text-slate-900 dark:text-slate-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Description "
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-end mt-5'>
                <button
                    type="submit"
                    className="flex justify-end rounded-md bg-slate-800 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Ajouter
                </button>
            </div>
        </form>
        <ActionList actions={actions} handleClick={handleActionClick} />
        <dialog open={open} className='rounded-md p-8'>
            {index !== -1 && <EditDialog index={index} actionDescription={actions[index].description} handleEventForm={handleEventForm} />}
        </dialog>
    </main>)
}