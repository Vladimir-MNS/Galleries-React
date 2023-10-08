import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Galleries from "../services/galleries.service";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import useFormattedDate from "../hooks/useFormattedDate";


const SingleGallery = () => {

const [gallery, setGallery] = useState ({})

const [activeImageIndex, setActiveImageIndex] = useState(0)

const {id} = useParams();

useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const {data} = await Galleries.get(id);
        
        if (isMounted) {
          setGallery(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

    return (

          <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
        <div class="card" width={900}>
  <div class="card-body">
    <h5 class="card-title">{gallery.name}</h5>
    <Link class="card-subtitle mb-2 text-muted" to={`/authors/${gallery.user_id}`}>{gallery.author}</Link>
    <small>Created on: {useFormattedDate(gallery.created_at)}</small>
    <p class="card-text">{gallery.description}</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
          <Carousel width={900}>
            {gallery.images &&
              gallery.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <a href={image.image_url} target="blank">
                  <img
                    className="d-block w-100"
                    src={image.image_url}
                    alt={`Image ${index}`}
                  />
                  </a>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
   
    )
}

export default SingleGallery;