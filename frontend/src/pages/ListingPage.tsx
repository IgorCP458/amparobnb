import BestCertified from "@/components/ListingPageComponents/BestCertified"
import ListingPageImages from "@/components/ListingPageComponents/ListingPageImages"
import ReservationCard from "@/components/ListingPageComponents/ReservationCard"
import { useListingContext } from "@/contexts/ListingContext"
import type { ListingModel } from "@/models/ListingModel"
import { ListingService } from "@/services/listings"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ListingPage () {

  const {id} = useParams<{id: string}>()
  const [listing, setListing] = useState<ListingModel | null >(null)
  const {state, setState} = useListingContext()

  useEffect(() => {
    
    const getListing = async () => {
      const response = await ListingService.getById(id)
      setListing(response[0])
      setState(prev => {
        return {
          ...prev,
          ...response[0]
        }
      })
    }
    getListing()


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
          <h1 className="text-3xl font-semibold py-4">{state.title}</h1>
          <div className="w-full"><ListingPageImages images={listing.imageUrls}/></div>
          <span className="py-4 text-2xl font-regular">{listing.listingType} em {listing.location}</span>
          <div className="grid grid-cols-8">
            <div className="col-span-5">
              <BestCertified/>
            </div>
            <div className="col-span-3">
              <ReservationCard/>
            </div>
          </div>
        </div>
    </div>

  )

}


export default ListingPage