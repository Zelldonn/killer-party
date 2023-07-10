import { useRouter } from "next/navigation"

export default function DistributionDone() {
    const router = useRouter()
    return (<>
        <h1>
            Le partie peut commencer !
        </h1>
        <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-regular leading-6 text-white" onClick={() => {router.push('/')}}>Revenir à l'accueil</button>
    </>)
}