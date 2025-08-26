import { useEffect, useState } from "react";


 // ajuste o path
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/services/AuthContext";
import { Separator } from "@radix-ui/react-select";
import api from "@/services/api";
import BookingCard from "@/components/AccountPage/BookingCard";
import MyListingCard from "@/components/AccountPage/MyListingCard";

interface Reservation {
  id: string;
  listingName: string;
  startDate: Date;
  endDate: Date;
}

interface Listing {
  id: number;
  title: string;
  location: string;
  pricePerNight: number;
}

export default function AccountPage() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [reservationListings, setReservationListings] = useState<Listing[]>([])

  useEffect(() => {
    if (user) {
      // 🔹 Busca reservas do usuário
      (async () => {
        const responseListings = await api.post('/listings/list', JSON.stringify({filterParams: {hostId: user.id}}))
        const responseReservations = await api.post('/bookings/list', JSON.stringify({filterParams: {userId: user.id}}))
        const reservationListingIds = responseReservations.data.map((reservation: any) => reservation.listingId)
        const reservationListingsResponse = await api.post('/listings/list', JSON.stringify({filterParams: {id: reservationListingIds}}))

        const reserves = responseReservations.data.map((reservation: any) => {
          for (var listing of reservationListingsResponse.data) {
            if(listing.id === reservation.listingId) {
              return({
                ...reservation,
                listing
              })
            }
          }
          
        })
        
        setReservationListings(reservationListingsResponse.data)
        setReservations(reserves)
        setListings(responseListings.data)
      }) ()
      // 🔹 Busca listings do usuário

    }
  }, [user]);



  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Você precisa estar logado.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Informações do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle>Minha Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </CardContent>
      </Card>

      <Separator />

      {/* Reservas */}
      <Card>
        <CardHeader>
          <CardTitle>Minhas Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          {reservations.length > 0 ? (
            <ul className="space-y-3">
              {reservations.map((r) => (
                <BookingCard key={r.id} booking={r} />
              ))}
            </ul>
          ) : (
            <p>Você ainda não possui reservas.</p>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Listings */}
      <Card>
        <CardHeader>
          <CardTitle>Minhas Listagens</CardTitle>
        </CardHeader>
        <CardContent>
          {listings.length > 0 ? (
            <ul className="space-y-3">
              {listings.map((l) => (
                <MyListingCard key={l.id} listing={l}/>
              ))}
            </ul>
          ) : (
            <p>Você ainda não cadastrou nenhum listing.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
