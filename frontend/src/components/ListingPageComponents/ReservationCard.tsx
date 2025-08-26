import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { addDays, differenceInDays, format, intervalToDuration } from "date-fns"
import { useEffect, useState } from "react"
import { type DateRange } from "react-day-picker"
import { useListingContext } from "@/contexts/ListingContext"
import api from "@/services/api"
import { useAuth } from "@/services/AuthContext"

interface GetDaysProps {
  from: Date,
  to: Date
}

function getDays (dateRange: GetDaysProps) {
  const result = differenceInDays(
    dateRange.to,
    dateRange.from
  )
  return result
}

export default function ReservationCard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date, 3),
    to: addDays(new Date, 5)
  })
  const {user} = useAuth()

  const {state} = useListingContext()

  async function handleClick () {
    const response = await api.post('/bookings/create', {
      listingId: state.id,
      userId: user?.id,
      guestName: user?.name,
      startDate: dateRange.from,
      endDate: dateRange.to,
      totalPrice: state.pricePerNight * (getDays(dateRange)),
      listingName: state.title
    })
    if(response.status !== 200) {
      console.log(response)
    }
    if(response.status === 200) {
      console.log("Reserva feita com sucesso: ", response.data)
    }
  }


  return (
    <Card className="shadow-lg rounded-xl p-4 ml-4">
      <CardContent className="space-y-4 text-center ">
        {dateRange? dateRange.from !== undefined && dateRange?.to !== undefined?  
        
        <h2 className="text-lg font-semibold mb-4">
          R$ {state.pricePerNight * (getDays(dateRange))} por {getDays(dateRange)} noites
        </h2>
        : <h2 className="text-lg font-semibold mb-4">
        Adicione datas para ver os preços
        </h2> : <h2>Nenhuma data selecionada</h2>}

        {/* Seção Check-in e Check-out */}
        <div className="grid grid-cols-2 border rounded-lg overflow-hidden mb-3">
          <div className="border-r p-2">
            <p className="text-xs font-semibold">CHECK-IN</p>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-sm text-gray-500 flex items-center gap-2 mx-auto py-2">
                  {dateRange? dateRange.from ? format(dateRange.from, "dd/MM/yyyy") : "Adicionar data" : "Adicionar data"}
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
               <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  disabled={{
                    before: addDays(new Date, 2)
                  }}
                  min={2}
                  max={7}
                  numberOfMonths={2}
                  className="rounded-lg border shadow-sm"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="p-2">
            <p className="text-xs font-semibold">CHECKOUT</p>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-sm text-gray-500 flex items-center gap-2 mx-auto py-2">
                  {dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "Adicionar data"}
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
              <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="rounded-lg border shadow-sm"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Seletor de Hóspedes */}
        <div className="mb-4">
          <p className="text-xs font-semibold mb-1">HÓSPEDES</p>
          <Select defaultValue="1">
            <SelectTrigger className="w-full text-center">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: state.maxGuests }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1} {i + 1 === 1 ? "hóspede" : "hóspedes"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botão */}
        <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full text-base py-5 cursor-pointer" onClick={handleClick}>
          Conferir disponibilidade
        </Button>
        <span >Você ainda não será cobrado {user?.name}</span>
      </CardContent>
    </Card>
  )
}
