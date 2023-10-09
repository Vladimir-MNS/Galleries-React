import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Galleries from "../services/galleries.service";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/spinner.style.css"
import { useContext } from "react";
import userContext from "../context/UserContext";
import AddComment from "../components/AddComment";
import Comments from "../components/Comments";
import { parseISO, format } from 'date-fns';


const SingleGallery = () => {

const [gallery, setGallery] = useState ({})

const { id } = useParams();

const {user} = useContext(userContext); 

const navigate = useNavigate();

useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const {data} = await Galleries.get(parseInt(id));
        
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
    const deleteAction = await Galleries.delete(parseInt(id))
    navigate('/mygalleries');
  }

  console.log(gallery);



const formattedDate = (str, outputFormat = 'yyyy-MM-dd HH:mm:ss') => {
    const parsedDate = parseISO(str)
    const formattedDate = format(parsedDate, outputFormat);
    return formattedDate;
};

  if (Object.keys(gallery).length === 0) {
    return <div className="loading-spinner">
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  </div>
  }



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
    <small>Created on: {formattedDate(gallery.created_at)}</small>
    <p className="card-text">Description: {gallery.description}</p>
    {user ?
    (user.id === gallery.user_id) && <div style={{ display:'flex', justifyContent:'space-around'}}>
    <Link type="button" class="btn btn-warning" to={`/edit-gallery/${gallery.id}`}>Edit Gallery</Link>
    <button class="btn btn-danger" onClick={()=>deleteGallery()}>Delete Gallery</button></div> : <></>}
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
        <div className="center-div">
        {user &&
        <AddComment galleryId={gallery.id} />}
      {gallery.comments ? gallery.comments.map((element)=> {
        return (<div key={element.id}><Comments comment={element}/></div>)
      }): <></>}
      </div>
      </div>
    </div>
   
    )
}

export default SingleGallery;