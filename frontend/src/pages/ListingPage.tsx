import BestCertified from "@/components/ListingPageComponents/BestCertified"
import ListingPageImages from "@/components/ListingPageComponents/ListingPageImages"
import ReservationCard from "@/components/ListingPageComponents/ReservationCard"
import { getListings } from "@/services/listings"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface ListingProps {
  id: string,
  title: string,
  description: string,
  imageUrls: string[],
  location: string,
  pricePerNight: number,
  maxGuests: number,
  listingType: string
}

function ListingPage () {
  const {id} = useParams<{id: string}>()
  const [listing, setListing] = useState<ListingProps | null >(null)

  useEffect(() => {
    const body = {
      "filterParams": {
        "id": id
      }
    }
    
    const fetchListing = async () => {
      try {
        const fetchListing = await getListings(body)
        setListing(fetchListing[0])

      } catch (error) {
        console.log(error)
      }
    }
    fetchListing()
  }, [])

  if(!listing) {
    return(
      <>
        <h1>Carregando...</h1>
      </>
    )
  }

  return(
    <div className="w-screen overflow-x-hidden bg-background content-start py-10">
        <div className="sm:max-w-[80%] lg:max-w-[1120px] mx-auto overflow-x-hidden min-h-screen bg-background hidden sm:flex flex-col">
          <h1 className="text-3xl font-semibold py-4">{listing.title}</h1>
          <div className="w-full"><ListingPageImages images={listing.imageUrls}/></div>
          <span className="py-4 text-2xl font-regular">{listing.listingType} em {listing.location}</span>
          <div className="grid grid-cols-8">
            <div className="col-span-5">
              <BestCertified/>
            </div>
            <div className="col-span-3">
              <ReservationCard maxGuests={listing.maxGuests} pricePerNight={listing.pricePerNight}/>
            </div>
          </div>
        </div>
    </div>
  )

}


export default ListingPage