import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export default function ReservaCard() {
  const [checkin, setCheckin] = useState<Date>()
  const [checkout, setCheckout] = useState<Date>()

  return (
    <Card className="w-full shadow-lg rounded-xl p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">
          Adicione datas para ver os preços
        </h2>

        {/* Seção Check-in e Check-out */}
        <div className="grid grid-cols-2 border rounded-lg overflow-hidden mb-3">
          <div className="border-r p-2">
            <p className="text-xs font-semibold">CHECK-IN</p>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-sm text-gray-500 flex items-center gap-2">
                  {checkin ? format(checkin, "dd/MM/yyyy") : "Adicionar data"}
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={checkin}
                  onSelect={setCheckin}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="p-2">
            <p className="text-xs font-semibold">CHECKOUT</p>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-sm text-gray-500 flex items-center gap-2">
                  {checkout ? format(checkout, "dd/MM/yyyy") : "Adicionar data"}
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={checkout}
                  onSelect={setCheckout}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Seletor de Hóspedes */}
        <div className="mb-4">
          <p className="text-xs font-semibold mb-1">HÓSPEDES</p>
          <Select defaultValue="1">
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 hóspede</SelectItem>
              <SelectItem value="2">2 hóspedes</SelectItem>
              <SelectItem value="3">3 hóspedes</SelectItem>
              <SelectItem value="4">4 hóspedes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botão */}
        <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full text-base py-5">
          Conferir disponibilidade
        </Button>
      </CardContent>
    </Card>
  )
}
