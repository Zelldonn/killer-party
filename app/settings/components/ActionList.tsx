import { Action } from "@/app/killer-game/types";

interface ActionProps {
    actions: Action[],
    handleClick: Function
}
const ActionList: React.FC<ActionProps> = ({ actions, handleClick }) => {
    const actionList = actions.map((action, index) =>
        <li className="w-full max-w-full text-ellipsis shadow-sm appearance-none list-none bg-slate-50 mb-1 rounded-md hover:bg-slate-100 hover:cursor-pointer py-2 px-4" key={index} onClick={() => { handleClick(index) }}>{action.description.substring(0,15)}...</li>
    );
    return (
        <div className="w-full max-w-full h-1/4 max-h-60 overflow-scroll ">
            {actionList}
        </div>
    )
}

export default ActionList