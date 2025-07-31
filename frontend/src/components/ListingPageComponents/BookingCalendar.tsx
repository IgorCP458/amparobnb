import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function BookingCalendar() {
  return (
    <Popover>
      <PopoverTrigger >
        <div className="bg-background">
          <Button variant="bookingButton" className="rounded-l-xl">Data do Check-in</Button>
          <Button variant="bookingButton" className="rounded-r-xl">Data do Check-out</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>Algum Content</PopoverContent>
    </Popover>
  )
}
