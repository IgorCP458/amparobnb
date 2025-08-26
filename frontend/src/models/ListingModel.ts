export type ListingModel = { 
  id: string,
  title: string,
  description: string,
  imageUrls: string[],
  location: string,
  pricePerNight: number,
  maxGuests: number,
  listingType: string
}