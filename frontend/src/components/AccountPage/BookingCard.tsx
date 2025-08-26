import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

function BookingCard ({booking}: any) {
  let status = {
    text: "Pendente",
    class: "text-red-600"
  }

  return (
    <div className="grid grid-cols-3 gap-4 border p-3 rounded-lg shadow-sm h-[200px] py-0 pl-0">
      <div className="content-center">
        <img src={booking.listing.imageUrls[0]} alt="" className="rounded-l-lg h-[200px] w-full" />
      </div>
      <div className="col-span-2">
        <li key={booking.id} className="">
          <p><strong>{booking.listingName}</strong></p>
          <p><strong>Período:</strong> {format(booking.startDate,'dd/MM/yyyy',{locale: ptBR})} - {format(booking.endDate,`dd/MM/yyyy`,{locale: ptBR})}</p>
          <p><strong></strong>R$ { booking.totalPrice }</p>
          <p className={status.class}>{status.text}</p>
        </li>
      </div>
      
    </div>
  )
}

export default BookingCard