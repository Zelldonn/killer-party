interface GiveToPlayerProps {
    name:string
}

const GiveToPlayer:React.FC<GiveToPlayerProps> = ({name}) =>{
    return (<>Passe le téléphone à : {name}</>)
}
export default GiveToPlayer