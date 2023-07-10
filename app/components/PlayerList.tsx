import { Player } from "../killer-game/types";

interface PlayerProps {
    players: Player[],
    handleClick: Function
}
const PlayerList: React.FC<PlayerProps> = ({ players, handleClick }) => {
    const playerList = players.map((player, index) =>
        <li key={index} onClick={() => { handleClick(index) }}>{player.name}</li>
    );
    return (
        <div>
            <div>
                {players.length} {` `} {players.length === 0 ? "Aucun joueur" : players.length > 1 ? "joueurs" : "joueur"}
            </div>
            {playerList}
        </div>
    )
}

export default PlayerList