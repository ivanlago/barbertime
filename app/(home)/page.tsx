import { format } from "date-fns"
import Header from "../_components/header"
import { ptBR } from "date-fns/locale"
import Search from "./_components/search"
import BookingItem from "../_components/booking-item"
import { db } from "../_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

export default async function Home() {
  // chamar prisma e pegar barbearias
  const Barbershops = await db.barbershop.findMany({})

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>

        {/* <h2 className="font-bold">{data?.user?.name}</h2> */}
        <p className="text-sm">
          {format(new Date(), "EEEE',' d ' de ' MMMM ' de ' yyyy", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6 px-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          AGENDAMENTOS
        </h2>
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          RECOMENDADOS
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {Barbershops.map((barbershp) => (
            <BarbershopItem key={barbershp.id} Barbershop={barbershp} />
          ))}
        </div>
      </div>

      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          POPULARES
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {Barbershops.map((barbershp) => (
            <BarbershopItem key={barbershp.id} Barbershop={barbershp} />
          ))}
        </div>
      </div>
    </div>
  )
}
