import ListingCard from "@/components/HomePageComponents/ListingCard"
import { ListingService } from "@/services/listings"
import { useEffect, useState } from "react"

function HomePage() {
  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    const body = {
      filterParams: {

      }
    }
    const getListings = async () => {
      const listings = await ListingService.getAll(body)  
      setListings(listings)
    }
    getListings()

  }, [])

  return(
    <div className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Imóveis</h1>
      
      {listings.length === 0 ? (
        <p className="text-lg text-gray-500">Nenhum imóvel encontrado.</p>
      ) : (

          <div className="flex flex-wrap gap-4">
            {listings.map((listing) => (
              <div 
                key={listing.id} 
                className="basis-1/6 min-w-[240px] bg-white dark:bg-background"
                >
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>

      )}
    </div>
  )
}

export default HomePage


