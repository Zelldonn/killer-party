import { Player } from "@/app/killer-game/types"
import { useState } from "react";
import ShowingLink from "./ShowingLink";
import GiveToPlayer from "./giveToPlayer";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface ChainProps {
    chain: Player[]
}
const PlayerSelector: React.FC<ChainProps> = ({ chain }) => {
    const router = useRouter()
    const [isShowingLink, setIsShowingLink] = useState(false)
    const [step, setStep] = useState<"ShowingAction" | "GiveToPlayer">("GiveToPlayer")
    const [buttonText, setButtonText] = useState<string>("")
    const [selectedPlayer, setSelectedPlayer] = useState<Player>({ action: { description: "" }, name: "", target: "" })

    const playerList = chain.map((player, index) =>
        <li className="w-full shadow-sm appearance-none list-none bg-slate-50 mb-1 rounded-md hover:bg-slate-100 hover:cursor-pointer py-2 px-4" key={index} onClick={() => { setSelectedPlayer(chain[index]); setButtonText(`Je suis ${chain[index].name}`); setIsShowingLink(true) }}>{player.name}</li>
    );

    const stepRender = (step: "ShowingAction" | "GiveToPlayer") => {
        console.log(step)
        switch (step) {
            case "GiveToPlayer":
                return <GiveToPlayer name={selectedPlayer.name} handleArrowBack={() => setIsShowingLink(false)} />
            case "ShowingAction":
                return <ShowingLink player={selectedPlayer} handleArrowBack={() => setIsShowingLink(false)} />
            default:
                <></>
                break;
        }
    }

    const updateStep = () => {
        if (step === "GiveToPlayer") {
            setButtonText("Ok, c'est noté")
            setStep("ShowingAction")
        } else {
            setIsShowingLink(false)
            setStep("GiveToPlayer")
        }
    }

    return <>
        {
            isShowingLink ?
                <>
                    {stepRender(step)}
                    <button onClick={() => updateStep()} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-regular leading-6 text-white">{buttonText}</button>
                </>
                :
                <div className="w-full flex mt-16">
                    <ArrowBack onClick={() => { router.push('/') }} className='absolute top-4 left-7 fill-white	' />

                    <div className="w-full h-1/4 max-h-96 overflow-scroll ">
                        {playerList}
                    </div>
                </div>
        }
    </>
}

export default PlayerSelector