import { format, isFuture } from "date-fns"
import Header from "../_components/header"
import { ptBR } from "date-fns/locale"
import Search from "./_components/search"
import BookingItem from "../_components/booking-item"
import { db } from "../_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [Barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),

    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ])

  confirmedBookings.sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user ? session.user.name : "Ola, visitante!"}
        </h2>

        <p className="text-sm">
          {format(new Date(), "EEEE',' d ' de ' MMMM ' de ' yyyy", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>

      {confirmedBookings.length > 0 && (
        <div className="mt-6 px-5">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            AGENDAMENTOS
          </h2>
          <div className="flex flex-col gap-3">
            {confirmedBookings.map((booking) => (
              <BookingItem booking={booking} key={booking.id} />
            ))}
          </div>
        </div>
      )}

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
