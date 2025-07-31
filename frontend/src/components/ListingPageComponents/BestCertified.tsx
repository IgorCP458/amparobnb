import { Wheat } from "lucide-react"

function BestCertified () {
  return(
    <div className="bg-background border border-white rounded-xl h-30 grid grid-cols-8 place-items-center">
      <div className="col-span-3 grid grid-cols-3 place-items-center text-center">
        <Wheat className="scale-x-[-1.5] scale-y-[2]"/>
        <span className="font-semibold text-lg">Preferido dos Hóspedes</span>
        <Wheat className="scale-x-[1.5] scale-y-[2]"/>
      </div>
      <div className="col-span-3 mr-3 text-center">
        <span className="">Uma das acomodações no AmparoBnB que fazem mais sucesso com os hóspedes</span>
      </div>
      <div className="col-span-1 grid grid-rows-2 text-center pr-2 border-r border-white">
        <span>4,78</span>
        <span>★★★★★</span>
      </div>
      <div className="col-span-1 grid grid-rows-2 text-center pr-2">
        <span>45</span>
        <span>avaliações</span>
      </div>
</div>

  )
}

export default BestCertified