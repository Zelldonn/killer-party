'use client'
import { useEffect, useState } from "react"
import GiveToPlayer from "./components/giveToPlayer"
import ShowingLink from "./components/ShowingLink"
import { useRouter } from "next/navigation"
import DistributionDone from "./components/distributionDone"
import { Player } from "../killer-game/types"

export default function Distribution() {
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

  const [linkIndex, setLinkIndex] = useState<number>(0)
  const [step, setStep] = useState<"ShowingAction" | "GiveToPlayer" | "DistributionDone">("GiveToPlayer")
  const [buttonText, setButtonText] = useState<string>("")

  useEffect(() => {
    const chain_ = loadChainFromLocalStorage("chain")
    setChain(chain_)
    setButtonText(`Je suis ${chain_[linkIndex].name}`)
  }, [])

  const handlePrevious = () => {
    setStep("GiveToPlayer")
    if(linkIndex === 0 && step === "GiveToPlayer"){
      router.push("/")
    }
    if (linkIndex === 0) {
      setLinkIndex(0)
      setButtonText(`Je suis ${chain[0].name}`)
    }
    else {
      setLinkIndex(linkIndex - 1)
      setButtonText(`Je suis ${chain[linkIndex - 1].name}`)
    }
  }

  const updateStep = () => {
    if (step === "ShowingAction" && linkIndex < chain.length - 1) {
      setButtonText(`Je suis ${chain[linkIndex + 1].name}`)
      setLinkIndex(linkIndex + 1)
    } else
      setButtonText("Ok, c'est noté")

    if (linkIndex === chain.length - 1 && step === "ShowingAction")
      setStep("DistributionDone")
    else
      step === "GiveToPlayer" ? setStep("ShowingAction") : setStep("GiveToPlayer")

  }

  const stepRender = (step: "ShowingAction" | "GiveToPlayer" | "DistributionDone") => {
    if (chain.length < 1)
      return
    switch (step) {
      case "DistributionDone":
        return <DistributionDone />
      case "GiveToPlayer":
        return <GiveToPlayer name={chain[linkIndex].name}  giveToPreviousPlayer={handlePrevious}/>
      case "ShowingAction":
        return <ShowingLink player={chain[linkIndex]} giveToPreviousPlayer={handlePrevious} />
      default:
        <></>
        break;
    }
  }

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between pb-10">
      {stepRender(step)}
      {step !== "DistributionDone" && <button onClick={() => updateStep()} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-regular leading-6 text-white">{buttonText}</button>}
    </main>
  )
}