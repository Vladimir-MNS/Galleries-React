import AppGalleries from "../components/AppGalleries";
import { useContext } from "react";
import userContext from "../context/UserContext";

const MyGalleries = () => {

const{user} = useContext(userContext);


    return <><AppGalleries userId={user.id} /> </>
}

export default MyGalleries;