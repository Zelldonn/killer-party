interface GiveToPlayerProps {
    name:string
}

const GiveToPlayer:React.FC<GiveToPlayerProps> = ({name}) =>{
    return (<div className="text-lg text-center">Donne le téléphone à : <br/> <span className="text-blue-900 text-2xl font-bold"> {name}</span></div>)
}
export default GiveToPlayer