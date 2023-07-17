import { ArrowBack } from "@mui/icons-material"

interface GiveToPlayerProps {
    name: string,
    handleArrowBack: Function
}

const GiveToPlayer: React.FC<GiveToPlayerProps> = ({ name, handleArrowBack }) => {
    return (
        <div className="w-96 h-fit pt-3 pb-2.5 bg-slate-500 justify-center items-center inline-flex">
            <ArrowBack onClick={() => { handleArrowBack() }} className='absolute top-4 left-7 fill-white	' />

            <div className="text-lg font-bold text-white text-center">Donne le téléphone à : <br /> <span className="text-white text-2xl font-bold"> {name}</span></div>
        </div>
    )
}
export default GiveToPlayer