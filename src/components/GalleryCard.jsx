import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

const GalleryCard = ({gallery}) => {

    return (

<div className="card">

<div className="view overlay">
  <img className="card-img-top" src={gallery.images[0]}
    alt="Card image cap"/>
  <a>
    <div className="mask rgba-white-slight"></div>
  </a>
</div>

<div className="card-body elegant-color white-text rounded-bottom">


  <a className="activator waves-effect mr-4"><i className="fas fa-share-alt white-text"></i></a>

  <Link to={`/galleries/${gallery.id}`}><h4 className="card-title">{gallery.name}</h4></Link>
  <hr className="hr-light"/>
  <small>Created on: {useFormattedDate(gallery.created_at)}</small>
  <Link to={`/authors/${gallery.user_id}`}><p >{gallery.author}</p></Link>

</div>

</div>

    )
} 

export default GalleryCard;