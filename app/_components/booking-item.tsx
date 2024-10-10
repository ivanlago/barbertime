import { AvatarImage } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Booking, Prisma } from "@prisma/client"
import { format, isPast } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  return (
    <Card>
      <CardContent className="flex px-0 py-0">
        <div className="flex flex-[3] flex-col gap-2 px-5 py-5">
          <Badge
            variant={isPast(booking.date) ? "secondary" : "default"}
            className="w-fit"
          >
            {isPast(booking.date) ? "Finalizado" : "Confirmado"}
          </Badge>

          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "HH':'mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
