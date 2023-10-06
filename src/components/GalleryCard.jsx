const GalleryCard = ({gallery}) => {
    return (
        <div class="card card-image"
        style={{backgroundImage: `url(${gallery.images[0]})`, width: '300px'}}>
      
        <div class="text-grey text-center d-flex align-items-center rgba-black-strong py-5 px-4">
          <div>
            <h5 class="pink-text"><i class="fas fa-chart-pie"></i> {gallery.name}</h5>
            <h3 class="card-title pt-2"><strong>{gallery.author}</strong></h3>
            <p>{gallery.description}</p>
            <a class="btn btn-pink"><i class="fas fa-clone left"></i> View project</a>
          </div>
        </div>
      
      </div>
    )
} 

export default GalleryCard;