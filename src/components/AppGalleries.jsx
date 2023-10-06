import "./../styles/card.style.css";
import GalleryCard from "./GalleryCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleriesValue } from "../store/galleries/selectors";
import { getAllGalleries } from "../store/galleries/slice";

const AppGalleries = () => {
  const galleries = useSelector(selectGalleriesValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGalleries());
  }, []);

  console.log(galleries);

  return (
    <div className="container-md">
      <div className="row">
        {(galleries.length > 0) ? (
          galleries.map((gallery, index) => (
            <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
              <GalleryCard gallery={gallery}/>
            </div>
          ))
        ) : (
          <div class="alert alert-primary" role="alert">
            We do not have any galleries added to the site yet
          </div>
        )}
      </div>
    </div>
  );
};

export default AppGalleries;
