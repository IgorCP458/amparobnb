import { useState } from "react"

interface Props {
  imageUrls: string[]
}

function ListingCardImage ({imageUrls}: Props) {
  const [index] = useState(0)
  
  return(
    <div className="relative min-w-[240px]">
      <img
        src={imageUrls[index]}
        className="w-full h-full object-cover rounded-4xl aspect-square"
      />
    </div>
  )
}

export default ListingCardImage