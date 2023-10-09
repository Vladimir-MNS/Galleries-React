import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Galleries from "../services/galleries.service";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import useFormattedDate from "../hooks/useFormattedDate";
import { useContext } from "react";
import userContext from "../context/UserContext";
import AddComment from "../components/AddComment";
import Comments from "../components/Comments";


const SingleGallery = () => {

const [gallery, setGallery] = useState ({})

const [activeImageIndex, setActiveImageIndex] = useState(0)

const {id} = useParams();

const {user} = useContext(userContext); 

const navigate = useNavigate();

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

  const deleteGallery = async () => {
    const deleteAction = await Galleries.delete(id)
    navigate('/mygalleries');
  }

  console.log(gallery);

    return (

          <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
        <div className="card" width={900}>
  <div className="card-body">
    <h5 className="card-title">{gallery.name}</h5>
    <label>Gallery Author: </label>
    <Link className="card-subtitle mb-2 text-muted" to={`/authors/${gallery.user_id}`}>{gallery.author}</Link>
    <br></br>
    <small>Created on: {useFormattedDate(gallery.created_at)}</small>
    <p className="card-text">Description: {gallery.description}</p>
    {user.id === gallery.user_id && <>
    <Link type="button" className="card-subtitle mb-2 text-muted" to={`/edit-gallery/${gallery.id}`}>Edit Gallery</Link>
    <button onClick={()=>deleteGallery()}>Delete Gallery</button></>}
  </div>
</div>
          <Carousel width={900}>
            {gallery.images &&
              gallery.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <a href={image} target="blank">
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Image ${index}`}
                  />
                  </a>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
        <AddComment galleryId={gallery.id} />
      </div>
      <div>
      <div>
      {gallery.comments ? gallery.comments.map((element)=> {
        return (<div key={element.id}><Comments comment={element}/></div>)
      }): ""}
      </div>
      </div>
    </div>
   
    )
}

export default SingleGallery;