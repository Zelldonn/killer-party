import { Player } from "@/app/killer-game/types"
import { Action, Link } from "@/app/types"


interface LinkProps {
    player: Player,
    target: Player,
    action: Action
}

const ShowingLink: React.FC<LinkProps> = ({ player, target, action }) => {
    return (<>
        <h1 className="text-blue-900 text-2xl font-bold">{player.name}</h1>
        <div className="flex flex-col items-center">
            Ta cible est : <br /> <span className="text-red-900 text-2xl font-bold">{target.name}</span> <br />
        </div>
        <div className="flex flex-col items-center">
            Ton action :<br /> <span className="text-indigo-700 text-lg text-center">{action.description}</span>
        </div>
    </>)
}

export default ShowingLink