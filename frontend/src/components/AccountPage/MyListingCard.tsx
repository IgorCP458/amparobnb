function MyListingCard ({listing}: any) {
  return (
    <div className="grid grid-cols-3 gap-4 border p-3 rounded-lg shadow-sm h-[200px] py-0 pl-0">
      <div className="content-center">
        <img src={listing.imageUrls[0]} alt="" className="rounded-l-lg h-[200px] w-full" />
      </div>
      <div className="col-span-2">
        <li key={listing.id} className="">
          <p><strong>{listing.listingName}</strong></p>
          
          <p><strong>Preço por noite: </strong>R$ { listing.pricePerNight }</p>
          <p>Número máximo de hóspedes: {listing.maxGuests}</p>
        </li>
      </div>
      
    </div>
  )
}

export default MyListingCard