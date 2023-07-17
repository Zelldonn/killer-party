'use client'
import React, { useEffect, useState } from 'react'
import PlayerList from './components/PlayerList'
import { KillerGame } from './killer-game/KillerGame'
import { Player } from './killer-game/types'
import { useRouter } from 'next/navigation'
import EditDialog from './components/EditDialog'
import SettingsIcon from '@mui/icons-material/Settings';
import { Delete } from '@mui/icons-material'


export default function Home() {

  const loadFromLocalStorage = (key: string): any => {
    if (typeof window !== 'undefined') {
      const string = localStorage.getItem(key)!
      if (string !== null) {
        const data = JSON.parse(string)
        return data
      }
    }
    return []
  }
  const [players, setPlayers] = useState<string[]>([])
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(-1)
  const router = useRouter()

  const handlePlayerClick = (index: number) => {
    setIndex(index)
    setOpen(true)
  }

  useEffect(() => {
    setPlayers(loadFromLocalStorage("players"))
  }, [])

  const handleEventForm = (type: string, name?: string) => {
    if (type === "exit")
      setOpen(false)
    if (type === "delete") {
      let updatedPlayers = players.filter((player, i) =>
        i !== index)

      setPlayers(updatedPlayers)
      setOpen(false)
    }
    if (type === "update") {
      if (!name)
        return
      players[index] = name
      setOpen(false)
    }
    setIndex(-1)
    setOpen(false)
  }

  const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  const CreateChain = () => {
    if (players.length < 6)
      return
    console.log("Creating chain with players : ", players)
    const killerGame = new KillerGame()
    players.forEach(name => {
      killerGame.addPlayer(name)
    });
    const chain = killerGame.newGame()
    if (chain.length > 0) {
      saveToLocalStorage("chain", JSON.stringify(chain))
      saveToLocalStorage("players", JSON.stringify(players))
      router.push("/distribution")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 ">
      <SettingsIcon onClick={() => { saveToLocalStorage("players", JSON.stringify(players)); router.push('/settings') }} className='absolute top-7 right-7 fill-gray-300' />

      <div className="w-full h-1/4 max-h-60">
        <div className='text-center'>
          <header className='text-xl'>Le jeu du killer</header>
          <div onClick={() => { router.push('/distribution/last') }} className="w-56 h-8 bg-zinc-600 py-5 rounded-3xl justify-center items-center gap-2 inline-flex">
            <div className="text-center text-white text-xs font-normal">Revoir la dernière distribution</div>
          </div>
        </div>
        <form className="w-full mt-10" onSubmit={(e) => { e.preventDefault(); setPlayers([...players, name]); setName("") }}>
          <div className="sm:col-span-4 ">
            <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900 dark:text-slate-50">
              Nom du joueur
            </label>
            <div className="mt-2">
              <div className="flex rounded-md text-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2  focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                  required
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 dark:text-slate-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Nom du joueur"
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


        <div className="my-2 flex items-center">
          <Delete onClick={() => { saveToLocalStorage("players", JSON.stringify([])); setPlayers([]) }} className='fill-slate-600' />
          <span className="text-cyan-600 mx-1  font-bold ">{players.length > 0 ? players.length : ""}</span> {``} {players.length === 0 ? "Aucun joueur" : players.length > 1 ? "joueurs" : "joueur"} <span className="text-sm italic ">(6 minimum)</span>

        </div>
        <PlayerList players={players} handleClick={handlePlayerClick} />
      </div>

      <dialog open={open} className='rounded-md p-8'>
        {index !== -1 && <EditDialog index={index} playerName={players[index]} handleEventForm={handleEventForm} />}
      </dialog>
      <button onClick={() => CreateChain()}
        className="flex w-full justify-center rounded-full bg-slate-800 px-3 py-2.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
      >
        Lancer une partie
      </button>
    </main>
  )
}
