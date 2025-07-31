import { Link } from "react-router-dom";
import ListingCardImage from "./ListingCardImage";

function ListingCard({ listing }: { listing: any }) {

  return (
      <div className="flex flex-col h-full">
      <Link to={`/listing/${listing.id}`}>
      <div className="flex-grow space-y-2">
        <ListingCardImage imageUrls={listing.imageUrls}/>
        <span className="text-sm font-semibold text-gray-800 dark:text-white">{listing.listingType} em {listing.location}</span>
      </div>
      <span className="text-xs font-light dark:text-gray-50 mb-2">R$ {listing.pricePerNight} p/ dia ⋅  ★ 4,9</span>
      </Link>
    </div>
  );
}

export default ListingCard