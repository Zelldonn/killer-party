'use client'
import React, { useState } from 'react'
import PlayerList from './components/PlayerList'
import { KillerGame } from './killer-game/KillerGame'
import { Player } from './killer-game/types'
import { useRouter } from 'next/navigation'


export default function Home() {
  const [players, setPlayers] = useState<Player[]>([])
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const router = useRouter()

  const handlePlayerClick = (index: number) => {
    console.log(index)
    setIndex(index)
    setOpen(true)
    // Open form
  }

  const handleEventForm = (type: string) => {
    console.log(type)
    setOpen(false)
    // Open form
  }

  const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  const CreateChain = () => {
    if (players.length < 4)
      return
    console.log("Creating chain with players : ", players)
    const killerGame = new KillerGame()
    players.forEach(player => {
      killerGame.addPlayer(player)
    });
    const chain = killerGame.newGame()
    saveToLocalStorage("chain", JSON.stringify(chain))
    router.push("/distribution")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>Le jeu du killer</header>
      <form onSubmit={(e) => { e.preventDefault(); setPlayers([...players, { name }]); setName("") }}>
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50">
            Nom du joueur
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2  focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
            className="flex justify-end rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ajouter
          </button>
        </div>
      </form>
      <PlayerList players={players} handleClick={handlePlayerClick} />

      {/* <dialog open={open} className='rounded-md p-8'>
        <EditForm index={index} playerName={players[index]} handleEventForm={handleEventForm}/>
      </dialog> */}
      <button onClick={() => CreateChain()}
        className="flex justify-end rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Lancer une partie
      </button>
    </main>
  )
}
