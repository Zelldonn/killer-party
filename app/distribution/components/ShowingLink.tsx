import { Player } from "@/app/killer-game/types"
import { Action, Link } from "@/app/types"
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";


interface LinkProps {
    player: Player,
    giveToPreviousPlayer: Function
}

const ShowingLink: React.FC<LinkProps> = ({ player, giveToPreviousPlayer }) => {
    const router = useRouter()
    return (<>
        <ArrowBack onClick={() => { giveToPreviousPlayer() }} className='absolute top-4 left-7 fill-white	' />

        <div className="w-96 h-14 pt-3 pb-2.5 bg-slate-500 justify-center items-center inline-flex">
            <div className="text-center text-white text-xl font-black">{player.name}</div>
        </div>
        <div className="flex flex-col items-left text-center mx-5">
            <div className="text-left"><span className="text-black text-sm font-black">Votre cible : </span><span className="text-black text-sm font-normal">{player.target}</span></div>
            <div className="text-left"><span className="text-black text-sm font-black">Votre action : </span><span className="text-black text-sm font-normal">{player.action.description}</span></div>
        </div>

        <div className="flex flex-col items-center text-center">
            <div className="w-full text-red-500 text-3xl font-medium mb-5 ">Cherche ton binôme</div>
            <div className="w-72text-black text-xl font-normal">Un ou plusieurs joueurs ont le même mot que toi :</div>
            <div className="text-purple-600  text-3xl font-black">{player.word}</div>
            <div className="w-60 "><span className="text-black text-sm font-black">Reste discret, </span>tu n’as pas le droit de prononcer ce mot et les autres joueurs ne doivent pas le connaître</div>
        </div>
    </>)
}

export default ShowingLink