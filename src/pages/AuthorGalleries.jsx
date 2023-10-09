import AppGalleries from "../components/AppGalleries";
import { useParams } from "react-router-dom";
import SearchButton from "../components/SearchButton";

const AuthorGalleries = () => {

const {id} = useParams()
const intId = parseInt(id)

    return (
        
        <><SearchButton userId={intId}/>
        <AppGalleries  /> </>
    )
}

export default AuthorGalleries;