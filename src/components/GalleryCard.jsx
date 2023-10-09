import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

const GalleryCard = ({gallery}) => {

    return (

<div class="card">

<div class="view overlay">
  <img class="card-img-top" src={gallery.images[0]}
    alt="Card image cap"/>
  <a>
    <div class="mask rgba-white-slight"></div>
  </a>
</div>

<div class="card-body elegant-color white-text rounded-bottom">


  <a class="activator waves-effect mr-4"><i class="fas fa-share-alt white-text"></i></a>

  <Link to={`/galleries/${gallery.id}`}><h4 class="card-title">{gallery.name}</h4></Link>
  <hr class="hr-light"/>
  <small>Created on: {useFormattedDate(gallery.created_at)}</small>
  <Link to={`/authors/${gallery.user_id}`}><p >{gallery.author}</p></Link>

</div>

</div>

    )
} 

export default GalleryCard;