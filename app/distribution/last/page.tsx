'use client'
import { Player } from "@/app/killer-game/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import PlayerSelector from "../components/PlayerSelector"


export default function LastDistribution() {
    const loadChainFromLocalStorage = (key: string): Player[] => {
        if (typeof window !== 'undefined') {
            const string = localStorage.getItem(key)!
            if (string === null) {
                router.push("/")
            }
            const chain: Player[] = JSON.parse(string)
            return chain
        }
        return []
    }

    const router = useRouter()

    const [chain, setChain] = useState<Player[]>([])

    useEffect(() => {
        const chainFromLocalstorage = loadChainFromLocalStorage("chain")
        setChain(chainFromLocalstorage)
    }, [])


    return (
        <main className="flex min-h-screen  flex-col items-center justify-between pb-10">
            <PlayerSelector chain={chain} />
        </main>
    )
}
