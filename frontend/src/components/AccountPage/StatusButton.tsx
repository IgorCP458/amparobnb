import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import BookingCarousel from "./Carousel"

export default function StatusButton({booking}: any) {
  //console.log(booking)
  const status = () => {
    if(booking.status === 'pending') {
      return {text: 'Pendente', class: 'text-red-500'}
    } else if (booking.status === 'confirmed') {
      return {text: 'Confirmado', class: 'text-green-500'}
    } else if (booking.status === 'canceled') {
      return {text: 'Cancelado', class: 'text-red-500'}
    } else {
      return {text: "..." , class: ""}
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">{status().text}</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Sua reserva</DialogTitle>
            <DialogDescription>
              {booking.listing.title}
              <br />
              <span className={status().class}>{status().text}, o pagamento ainda não foi confirmado</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-4 w-[70%]">
              <BookingCarousel images={booking.listing.imageUrls} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Data reservada</Label>
              <span>{format(booking.startDate, 'dd/MM/yyyy')} - {format(booking.endDate, 'dd/MM/yyyy')}</span>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Valor da reserva</Label>
              <span>R$ {booking.totalPrice}</span>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar Reserva</Button>
            </DialogClose>
            <Button type="submit">Confirmar Pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
