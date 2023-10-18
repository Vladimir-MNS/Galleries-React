import GalleryCard from "./GalleryCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleriesValue } from "../store/galleries/selectors";
import { searchAllGalleries } from "../store/galleries/slice";
import { useParams } from "react-router-dom";
import "../styles/spinner.style.css";

const AppGalleries = ({ userId }) => {

 

  const galleries = useSelector(selectGalleriesValue);
  const [take, setTake] = useState(10);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    const fetchGalleries = () => {
      if (userId) {
        dispatch(
          searchAllGalleries({ take: take, skip: 0, field: "user_id", query: userId })
        );
      } else if (id) {
        dispatch(
          searchAllGalleries({ take: take, skip: 0, field: "user_id", query: id })
        );
      } else {
        dispatch(searchAllGalleries({ take: take }));
      }
    };
    fetchGalleries();
  }, [take]);


  setTimeout(() => {
    setShowSpinner(false);
  }, 5000);

  if (galleries.length === 0) {
    return (showSpinner ? <div className="loading-spinner">
    <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  </div> :  <div className="container-md">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger">
              There are no galleries to show
            </div>
          </div>
        </div>
      </div>
  )
  }

  return (
    <div className="container-md">
      <div className="row">
        {galleries.map((gallery, index) => (
          <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <GalleryCard gallery={gallery} />
          </div>
        ))}
      </div>

      {galleries.length >= take && (
        <div>
          <button
            className="btn btn-primary btn-lg btn-block"
            type="button"
            onClick={() => setTake((prevValue) => prevValue + 10)}>
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default AppGalleries;
