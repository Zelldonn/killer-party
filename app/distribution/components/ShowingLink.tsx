import { Link } from "@/app/types"

const ShowingLink: React.FC<Link> = (link) => {
    return (<>
        Ta cible est : {link.link.target.name} <br/>
        Tu dois : {link.link.action.description}
    </>)
}

export default ShowingLink