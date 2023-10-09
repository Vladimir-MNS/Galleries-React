import AppGalleries from "../components/AppGalleries";
import { useContext } from "react";
import userContext from "../context/UserContext";
import SearchButton from "../components/SearchButton";

const MyGalleries = () => {

const{user} = useContext(userContext);


    return <>
    <SearchButton userId={user.id} />
    <AppGalleries userId={user.id} /> </>
}

export default MyGalleries;