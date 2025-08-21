import { useEffect, useState } from "react";
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

 // ajuste o path
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/services/AuthContext";
import { Separator } from "@radix-ui/react-select";
import api from "@/services/api";

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

  useEffect(() => {
    if (user) {
      // 🔹 Busca reservas do usuário
      (async () => {
        const responseListings = await api.post('/listings/list', JSON.stringify({filterParams: {hostId: user.id}}))
        const responseReservations = await api.post('/bookings/list', JSON.stringify({filterParams: {hostId: user.id}}))
        setReservations(responseReservations.data)
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
                <li key={r.id} className="border p-3 rounded-lg shadow-sm">
                  <p><strong>Listing:</strong> {r.listingName}</p>
                  <p><strong>Check-in:</strong> {format(r.startDate,'d/MM/yyyy',{locale: ptBR})}</p>
                  <p><strong>Check-out:</strong> {format(r.endDate,`d/MM/yyyy`,{locale: ptBR})}</p>
                  <p><strong>Preço total:</strong> { r.totalPrice }</p>
                </li>
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
                <li key={l.id} className="border p-3 rounded-lg shadow-sm">
                  <p><strong>Título:</strong> {l.title}</p>
                  <p><strong>Localização:</strong> {l.location}</p>
                  <p><strong>Preço por noite:</strong> R${l.pricePerNight}</p>
                </li>
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
