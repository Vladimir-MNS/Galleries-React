import "./../styles/card.style.css";
import GalleryCard from "./GalleryCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleriesValue } from "../store/galleries/selectors";
import { getAllGalleries,searchAllGalleries } from "../store/galleries/slice";
import SearchButton from "./SearchButton";

const AppGalleries = ({userId}) => {
  const galleries = useSelector(selectGalleriesValue);
  const [emptyGalleries, setEmptyGalleries] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGalleries = userId
      ? () => dispatch(searchAllGalleries({take:10, skip:0, field: "user_id", query: userId}))
      : () => dispatch(getAllGalleries());

    fetchGalleries();
    !galleries
      ? setEmptyGalleries("We do not have any galleries added to the site yet")
      : setEmptyGalleries("");
  }, []);
  console.log(emptyGalleries);

  console.log(galleries);

  return (
    <div className="container-md">
      <div className="row">
        {!emptyGalleries ? (
        galleries.map((gallery, index) => (
          <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <GalleryCard gallery={gallery} />
          </div>
        ))
        ) : (
         <div class="alert alert-primary" role="alert">
             {emptyGalleries}
           </div>
         )} 
      </div>
    </div>
  );
};

export default AppGalleries;
