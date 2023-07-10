'use client'
import { useEffect, useState } from "react"
import GiveToPlayer from "./components/giveToPlayer"
import ShowingLink from "./components/ShowingLink"
import { useRouter } from "next/navigation"
import DistributionDone from "./components/distributionDone"
import { Link } from "../killer-game/types"

export default function Distribution() {
  const loadChainFromLocalStorage = (key: string): Link[] => {
    if (typeof window !== 'undefined') {
      const string = localStorage.getItem(key)!
      if (string === null) {
        router.push("/")
      }
      const chain: Link[] = JSON.parse(string)
      return chain
    }
    return []
  }

  const router = useRouter()

  const [chain, setChain] = useState<Link[]>(loadChainFromLocalStorage("chain"))

  const [linkIndex, setLinkIndex] = useState<number>(0)
  const [step, setStep] = useState<"ShowingAction" | "GiveToPlayer" | "DistributionDone">("GiveToPlayer")
  const [buttonText, setButtonText] = useState<string>("")

  useEffect(() => {
    setButtonText(`Je suis ${chain[linkIndex].player.name}`)
  }, [chain])

  const updateStep = () => {
    console.log(linkIndex)
    if (step === "ShowingAction" && linkIndex < chain.length - 1) {
      setButtonText(`Je suis ${chain[linkIndex + 1].player.name}`)
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
        return <GiveToPlayer name={chain[linkIndex].player.name} />
      case "ShowingAction":
        return <ShowingLink player={chain[linkIndex].player} target={chain[linkIndex].target} action={chain[linkIndex].action} />
      default:
        <></>
        break;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {stepRender(step)}
      {step !== "DistributionDone" && <button onClick={() => updateStep()} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-regular leading-6 text-white">{buttonText}</button>}
    </main>
  )
}