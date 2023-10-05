import "./../styles/card.style.css";
import GalleryCard from "./GalleryCard";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { selectGalleriesValue } from "../store/galleries/selectors";
import { getAllGalleries } from "../store/galleries/slice";

const AppGalleries = () => {

const galleries = useSelector(selectGalleriesValue);
const dispatch = useDispatch()

useEffect(()=> {
dispatch(getAllGalleries())},
[])

console.log(galleries);


    return (

<div className='container'>
<div className="row" >
  {galleries ? 
  galleries.map((gallery, index)=>(
    <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
     <GalleryCard/>
     </div>
     ))
: (<div class="alert alert-primary" role="alert">
We do not have any galleries added to the site
</div>)
    }
</div>
</div>

    )
}

export default AppGalleries;