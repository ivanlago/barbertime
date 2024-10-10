import { getServerSession } from "next-auth"
import BookingItem from "../_components/booking-item"
import Header from "../_components/header"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { db } from "../_lib/prisma"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect("/")
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),

    db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          lte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ])

  confirmedBookings.sort((a, b) => a.date.getTime() - b.date.getTime())
  finishedBookings.sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div>
      <Header />
      <div className="px-5 py-5">
        <h1 className="mb-5 text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 text-sm font-bold uppercase text-gray-400">
              CONFIRMADOS
            </h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-5 text-sm font-bold uppercase text-gray-400">
              FINALIZADOS
            </h2>

            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BookingsPage
