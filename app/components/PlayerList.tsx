import { Player } from "../killer-game/types";

interface PlayerProps {
    players: string[],
    handleClick: Function
}
const PlayerList: React.FC<PlayerProps> = ({ players, handleClick }) => {
    const playerList = players.map((name, index) =>
        <li className="w-full shadow-sm appearance-none list-none bg-slate-50 mb-1 rounded-md hover:bg-slate-100 hover:cursor-pointer py-2 px-4" key={index} onClick={() => { handleClick(index) }}>{name}</li>
    );
    return (
        <div className="w-full h-1/4 max-h-60 overflow-scroll ">
            {playerList}
        </div>
    )
}

export default PlayerList