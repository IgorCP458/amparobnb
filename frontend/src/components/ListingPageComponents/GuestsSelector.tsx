import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function GuestsSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
        >
          {value > 0 ? `${value} ${value === 1 ? "hóspede" : "hóspedes"}` : "Selecionar hóspedes"}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex justify-between items-center">
          <span className="font-medium">Hóspedes</span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onChange(Math.max(0, value - 1))}
            >
              -
            </Button>
            <span className="w-6 text-center">{value}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onChange(value + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
