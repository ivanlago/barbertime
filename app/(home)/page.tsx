import { format } from "date-fns"
import Image from "next/image"
import { Button } from "../_components/ui/button"
import Header from "../_components/header"
import { ptBR } from "date-fns/locale"
import Search from "./_components/search"
import BookingItem from "../_components/booking-item"

const name = "test"
export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>
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
    </div>
  )
}
