interface Props {
  images: string[]
}

function ListingPageImages ({images}: Props) {

  return(
    <div className="images">
        <div className="grid grid-cols-4 gap-4 hidden sm:grid">
        {/* Imagem Destaque*/}
        <div className="col-span-2 row-span-2">
        <img
        src={images[0]}
        alt=""
        className="w-full h-full object-cover rounded-lg"
        />
        </div>
        {/* Imagem 01*/}
        <div className="aspect-square">
        <img
        src={images[1]}
        alt=""
        className="w-full h-full object-cover rounded-lg"
        />
        </div>
        {/* Imagem 02*/}
        <div className="aspect-square">
        <img
        src={images[2]}
        alt=""
        className="w-full h-full object-cover rounded-lg"
        />
        </div>
        {/* Imagem 03*/}
        <div className="aspect-square">
        <img
        src={images[3]}
        alt=""
        className="w-full h-full object-cover rounded-lg"
        />
        </div>
        {/* Imagem 04*/}
        <div className="aspect-square">
        <img
        src={images[4]}
        alt=""
        className="w-full h-full object-cover rounded-lg"
        />
        </div>
      </div>
    </div>
  )
}

export default ListingPageImages