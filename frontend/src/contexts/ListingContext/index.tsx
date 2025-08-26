import type { ListingModel } from "@/models/ListingModel";
import { createContext, useContext, useState } from "react";

const initialState = {
  id: "string",
  title: "string",
  description: "string",
  imageUrls: ["string"],
  location: "string",
  pricePerNight: 123,
  maxGuests: 123,
  listingType: "string"
}

type ListingContextProps = {
  state: ListingModel,
  setState: React.Dispatch<React.SetStateAction<ListingModel>>
}

const inititalContextValue = {
  state: initialState,
  setState: () => {throw new Error("setState foi usado fora do ListingContextProvider");}
}

export const ListingContext = createContext<ListingContextProps>(inititalContextValue);



type ListingContextProviderProps = {
  children: React.ReactNode
}

export function ListingContextProvider ({children}: ListingContextProviderProps) {
  const [state, setState] = useState<ListingModel>(initialState)
  
  return (
    <ListingContext.Provider value={{state, setState}}>
      {children}
    </ListingContext.Provider>
  )
}

export function useListingContext() {
  return useContext(ListingContext)
}
