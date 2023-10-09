import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

const GalleryCard = ({gallery}) => {

    return (
      //   <div class="card card-image"
      //   style={{backgroundImage: `url(${gallery.images[0]})`, width: '300px'}}>
      
      //   <div class="text-grey text-center d-flex align-items-center rgba-black-strong py-5 px-4">
      //     <div>
      //       <h5 class="pink-text"><i class="fas fa-chart-pie"></i> {gallery.name}</h5>
      //       <h3 class="card-title pt-2"><strong>{gallery.author}</strong></h3>
      //       <p>{gallery.description}</p>
      //       <Link class="btn btn-pink" to={`/galleries/${gallery.id}`}> View Gallery</Link>
      //     </div>
      //   </div>
      
      // </div>

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
  <p class="card-text white-text mb-4">Author: {gallery.author}</p>

</div>

</div>

    )
} 

export default GalleryCard;