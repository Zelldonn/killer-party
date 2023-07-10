import { Player } from "@/app/killer-game/types"
import { Action, Link } from "@/app/types"


interface LinkProps {
    player: Player,
    target: Player,
    action: Action
}

const ShowingLink: React.FC<LinkProps> = ({ player, target, action }) => {
    return (<>
        <h1>{player.name}</h1>
        Ta cible est : {target.name} <br />
        Tu dois : {action.description}
    </>)
}

export default ShowingLink