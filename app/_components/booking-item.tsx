"use client"

import { AvatarImage } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Prisma } from "@prisma/client"
import { format, isPast } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { Button } from "./ui/button"
import cancelBooking from "../_actions/cancel-booking"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "./ui/alert-dialog"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const handleCancelBooking = async () => {
    setIsDeleteLoading(true)
    try {
      cancelBooking(booking.id)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="cursor-pointer">
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
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 text-left">
          <SheetTitle>Informações de Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <div className="relative mt-6 h-[180px] w-full">
            <Image
              src="/barbershop-map.png"
              fill
              style={{
                objectFit: "contain",
              }}
              alt={booking.barbershop.name}
            />

            <div className="absolute bottom-4 left-0 w-full px-5">
              <Card>
                <CardContent className="flex gap-2 p-3">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="overflow-hidden, text-ellipsis text-nowrap text-xs">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isPast(booking.date) ? "secondary" : "default"}
            className="my-3 w-fit"
          >
            {isPast(booking.date) ? "Finalizado" : "Confirmado"}
          </Badge>

          <Card>
            <CardContent className="flex flex-col gap-3 p-3">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h2 className="font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h2>
              </div>

              <div className="flex justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <h2 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </h2>
              </div>

              <div className="flex justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <h2 className="text-sm">{format(booking.date, "hh':'mm")}</h2>
              </div>

              <div className="flex justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <h2 className="text-sm">{booking.barbershop.name}</h2>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-3">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full"
                  variant="destructive"
                  disabled={isPast(booking.date)}
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja reamente deleter a reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não poderá ser revertida.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row gap-3">
                  <AlertDialogCancel className="mt-0 w-full">
                    Vontar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    onClick={handleCancelBooking}
                    className="w-full"
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
